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
            "name": "Company Name",
            "front_backend": [
                "sample language"
            ],
            "js_mvc": "mvc javascript framework",
            "js_framework": "javascript core framewrok",
            "js_view": "javascript view / templating framework",
            "other": [
                "other libraries"
            ]
        }]};
    },
    componentDidMount: function () {
        this.loadDataFromServer();
    },
    render: function () {
        var companyNodes = this.state.data.map(function (company) {

            var companyWithDefaults = _.assign(
                {'other': [], 'js_view': '-', 'js_framework': '-', 'js_mvc': '-', 'front_backend': []},
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
        var serverTechnologies = this.props.company.front_backend.map(function (technology) {
            return (
                <li>{technology}</li>
            );
        });

        var otherTechnologies = this.props.company.other.map(function (technology) {
            return (
                <li>{technology}</li>
            );
        });

        return (
            <div className={"company element-item well col-md-3 company-" + this.props.color}>
                <CompanyLogo name={this.props.company.name} />
                <div className="frontendServer">
                    <h4>Front end server</h4>
                    <ul>
                        {serverTechnologies}
                    </ul>
                </div>
                <div className="mvcFramework">
                    <h4>MVC Framework</h4>
                    <span>{this.props.company.js_mvc}</span>
                </div>
                <div className="coreFramework">
                    <h4>Utils</h4>
                    <span>{this.props.company.js_framework}</span>
                </div>
                <div className="viewFramework">
                    <h4>View / Templates</h4>
                    <span>{this.props.company.js_view}</span>
                </div>
                <div className="other">
                    <h4>Other</h4>
                    <ul>
                        {otherTechnologies}
                    </ul>
                </div>
            </div>
        )
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
                <p><a href="#">
                    <img src={"app/img/" + imgName + ".png"} alt={imgName} />
                </a></p>
            </div>
        );
    }
});

React.render(
    <AppBox url="data.json" />,
    document.getElementById('content')
);
