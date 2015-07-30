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

            return (
                <Company company={companyWithDefaults} />
            );
        });

        return (
            <div className="companyList">
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
            <div className="well col-md-3 company">
                <div className="companyName">
                    <h2>{this.props.company.name.toUpperCase()}</h2>
                </div>
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

React.render(
    <CompanyBox url="data.json" />,
    document.getElementById('content')
);
