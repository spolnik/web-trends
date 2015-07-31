var AppBox = React.createClass({displayName: "AppBox",
    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "col-md-10"}, 
                    React.createElement(CompanyBox, {url: this.props.url})
                ), 
                React.createElement("div", {className: "col-md-2"}, 
                    React.createElement(FilterBox, null)
                )
            )
        )
    }
});

var FilterBox = React.createClass({displayName: "FilterBox",
    render: function () {
        return (
            React.createElement("div", {className: "well filter"}, 
                React.createElement("h2", null, "Filters"), 
                "A" + ' ' +
                "B" + ' ' +
                "C"
            )
        );
    }
});

var CompanyBox = React.createClass({displayName: "CompanyBox",
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
                React.createElement(Company, {company: companyWithDefaults, color: color})
            );
        });

        return (
            React.createElement("div", {className: "companyList"}, 
                companyNodes
            )
        )
    }
});

var Company = React.createClass({displayName: "Company",
    render: function () {
        var serverTechnologies = this.props.company.front_backend.map(function (technology) {
            return (
                React.createElement("li", null, technology)
            );
        });

        var otherTechnologies = this.props.company.other.map(function (technology) {
            return (
                React.createElement("li", null, technology)
            );
        });

        return (
            React.createElement("div", {className: "company well col-md-3 company-" + this.props.color}, 
                React.createElement(CompanyLogo, {name: this.props.company.name}), 
                React.createElement("div", {className: "frontendServer"}, 
                    React.createElement("h4", null, "Front end server"), 
                    React.createElement("ul", null, 
                        serverTechnologies
                    )
                ), 
                React.createElement("div", {className: "mvcFramework"}, 
                    React.createElement("h4", null, "MVC Framework"), 
                    React.createElement("span", null, this.props.company.js_mvc)
                ), 
                React.createElement("div", {className: "coreFramework"}, 
                    React.createElement("h4", null, "Utils"), 
                    React.createElement("span", null, this.props.company.js_framework)
                ), 
                React.createElement("div", {className: "viewFramework"}, 
                    React.createElement("h4", null, "View / Templates"), 
                    React.createElement("span", null, this.props.company.js_view)
                ), 
                React.createElement("div", {className: "other"}, 
                    React.createElement("h4", null, "Other"), 
                    React.createElement("ul", null, 
                        otherTechnologies
                    )
                )
            )
        )
    }
});

var CompanyLogo = React.createClass({displayName: "CompanyLogo",
    render: function () {

        var imgName = this.props.name.replace(/ /g, "").toLowerCase();

        return (
            React.createElement("div", {className: "companyName div-center"}, 
                React.createElement("div", {className: "stack-name"}, 
                    React.createElement("span", null, this.props.name)
                ), 
                React.createElement("p", null, React.createElement("a", {href: "#"}, 
                    React.createElement("img", {src: "app/img/" + imgName + ".png", alt: imgName})
                ))
            )
        );
    }
});

React.render(
    React.createElement(AppBox, {url: "data.json"}),
    document.getElementById('content')
);
