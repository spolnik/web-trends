var AppBox = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="col-md-10">
                    <CompanyBox url={this.props.url} />
                </div>
                <div className="col-md-2">
                    <FilterBox />
                </div>
            </div>
        )
    }
});

var FilterBox = React.createClass({
    render: function () {

        return (
            <div className="filter">
                <h2>Filters</h2>
                <ul className="nav nav-stacked">
                    <li className="active"><Filter selector='*' value='all' /></li>
                    <li><Filter selector='.ember' value='ember' /></li>
                    <li><Filter selector='.backbone' value='backbone' /></li>
                    <li><Filter selector='.angular' value='angular' /></li>
                </ul>
                <div className="bar yellow"></div>
                <ul className="nav nav-stacked">
                    <li><Filter selector='.scala' value='scala' /></li>
                    <li><Filter selector='.java' value='java' /></li>
                    <li><Filter selector='.nodejs' value='nodejs' /></li>
                    <li><Filter selector='.ruby' value='ruby' /></li>
                    <li><Filter selector='.go' value='go' /></li>
                    <li><Filter selector='.python' value='python' /></li>
                    <li><Filter selector='.php' value='php' /></li>
                </ul>
                <div className="bar blue"></div>
                <ul className="nav nav-stacked">
                    <li><Filter selector='.react' value='react' /></li>
                    <li><Filter selector='.dust' value='dust' /></li>
                    <li><Filter selector='.handlebars' value='handlebars' /></li>
                    <li><Filter selector='.mustache' value='mustache' /></li>
                </ul>
                <div className="bar violet"></div>
                <ul className="nav nav-stacked">
                    <li><Filter selector='.other' value='other' /></li>
                </ul>
            </div>
        );
    }
});

var Filter = React.createClass({
   render: function () {

       return (
            <a className="filterButton" data-filter={this.props.selector} >
                {this.props.value}
            </a>
       );
   }
});

var CompanyBox = React.createClass({
    loadDataFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: true,
            success: function (data) {
                this.setState({data: _.shuffle(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: [{
            "name": "Netflix",
            "front_backend_new": "node.js",
            "front_backend_old": "java",
            "js_view": "react",
            "js_mvc": "ember",
            "url": "https://www.netflix.com"
        }]};
    },
    componentDidMount: function () {
        this.loadDataFromServer();
    },
    render: function () {
        var companyNodes = this.state.data.map(function (company) {

            var companyWithDefaults = _.assign(
                {'other': [], 'js_view': 'other', 'js_mvc': 'other', "front_backend_new": "-", "front_backend_old": "-"},
                company
            );

            var classes = [];

            for (var prop in companyWithDefaults) {
                classes.push(companyWithDefaults[prop]);
            }

            return (
                <Company company={companyWithDefaults} classes={classes.join(' ')} />
            );
        });

        return (
            <div className="companyList grid">
                {companyNodes}
            </div>
        )
    }
});

var Company = React.createClass({
    render: function () {

        return (
            <div className={"company element-item well col-lg-3 col-md-4 col-sm-5 col-xs-10 " + this.props.classes}>
                <CompanyLogo name={this.props.company.name} url={this.props.company.url} />
                <Technology name="View" value={this.props.company.js_view} />
                <Technology name="MVC" value={this.props.company.js_mvc} />
                <Technology name="Server&nbsp;New" value={this.props.company.front_backend_new} />
                <Technology name="Server&nbsp;Old" value={this.props.company.front_backend_old} />
            </div>
        )
    }
});

var Technology = React.createClass({
    render: function () {
        if (this.props.value)

        return (
            <div className="technology">
                <div className="row">
                    <span className="technology-name col-xs-6">{this.props.name}</span>
                    <span className="technology-value col-xs-6">{this.props.value}</span>
                </div>
            </div>
        );
    }
});

var CompanyLogo = React.createClass({
    render: function () {

        var imgName = this.props.name.replace(/ /g, "").toLowerCase();

        return (
            <div className="companyName">
                <div className="stack-name div-center">
                    <span>{this.props.name}</span>
                </div>
                <div className="div-center">
                    <p><a href={this.props.url} target="_blank">
                        <img src={"dist/img/" + imgName + ".png"} alt={imgName} />
                    </a></p>
                </div>

            </div>
        );
    }
});

React.render(
    <AppBox url="data.json" />,
    document.getElementById('content')
);
