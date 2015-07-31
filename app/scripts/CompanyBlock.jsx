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
            <div className="well filter">
                <h2>Filters</h2>
                <Filter selector='*' value='all' />
                <Filter selector='.company-yellow' value='ember' />
                <Filter selector='.company-blue' value='backbone' />
                <Filter selector='.company-green' value='angular' />
            </div>
        );
    }
});

var Filter = React.createClass({
   render: function () {

       return (
            <div>
                <button className="filterButton btn btn-default"
                        data-filter={this.props.selector} >
                    {this.props.value}
                </button>
            </div>
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
                this.setState({data: data});
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
            "js_mvc": "ember"
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

            var color = "violet";

            switch (company.js_mvc) {
                case "ember":
                    color = "yellow";
                    break;
                case "backbone":
                    color = "blue";
                    break;
                case "angular":
                    color = "green";
                    break;
            }

            return (
                <Company company={companyWithDefaults} color={color} />
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
            <div className={"company element-item well col-md-3 company-" + this.props.color}>
                <CompanyLogo name={this.props.company.name} />
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
            <div className="companyName div-center">
                <div className="stack-name">
                    <span>{this.props.name}</span>
                </div>
                <div className="container">
                    <p><a href="#">
                        <img src={"app/img/" + imgName + ".png"} alt={imgName} />
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
