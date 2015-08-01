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
            React.createElement("div", {className: "filter"}, 
                React.createElement("h2", null, "Filters"), 
                React.createElement("ul", {className: "nav nav-stacked"}, 
                    React.createElement("li", {className: "active"}, React.createElement(Filter, {selector: "*", value: "all"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".ember", value: "ember"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".backbone", value: "backbone"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".angular", value: "angular"}))
                ), 
                React.createElement("div", {className: "bar yellow"}), 
                React.createElement("ul", {className: "nav nav-stacked"}, 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".scala", value: "scala"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".java", value: "java"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".nodejs", value: "nodejs"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".ruby", value: "ruby"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".go", value: "go"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".python", value: "python"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".php", value: "php"}))
                ), 
                React.createElement("div", {className: "bar blue"}), 
                React.createElement("ul", {className: "nav nav-stacked"}, 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".react", value: "react"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".dust", value: "dust"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".handlebars", value: "handlebars"})), 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".mustache", value: "mustache"}))
                ), 
                React.createElement("div", {className: "bar violet"}), 
                React.createElement("ul", {className: "nav nav-stacked"}, 
                    React.createElement("li", null, React.createElement(Filter, {selector: ".other", value: "other"}))
                )
            )
        );
    }
});

var Filter = React.createClass({displayName: "Filter",
   render: function () {

       return (
            React.createElement("a", {className: "filterButton", "data-filter": this.props.selector}, 
                this.props.value
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

            var classes = [];

            for (var prop in companyWithDefaults) {
                classes.push(companyWithDefaults[prop]);
            }

            return (
                React.createElement(Company, {company: companyWithDefaults, color: classes.join(' ')})
            );
        });

        return (
            React.createElement("div", {className: "companyList grid"}, 
                companyNodes
            )
        )
    }
});

var Company = React.createClass({displayName: "Company",
    render: function () {

        return (
            React.createElement("div", {className: "company element-item well col-md-3 company-" + this.props.color}, 
                React.createElement(CompanyLogo, {name: this.props.company.name}), 
                React.createElement(Technology, {name: "View", value: this.props.company.js_view}), 
                React.createElement(Technology, {name: "MVC", value: this.props.company.js_mvc}), 
                React.createElement(Technology, {name: "Server New", value: this.props.company.front_backend_new}), 
                React.createElement(Technology, {name: "Server Old", value: this.props.company.front_backend_old})
            )
        )
    }
});

var Technology = React.createClass({displayName: "Technology",
    render: function () {
        if (this.props.value)

        return (
            React.createElement("div", {className: "technology"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("span", {className: "technology-name col-xs-6"}, this.props.name), 
                    React.createElement("span", {className: "technology-value col-xs-6"}, this.props.value)
                )
            )
        );
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
                React.createElement("div", {className: "container"}, 
                    React.createElement("p", null, React.createElement("a", {href: "#"}, 
                        React.createElement("img", {src: "app/img/" + imgName + ".png", alt: imgName})
                    ))
                )

            )
        );
    }
});

React.render(
    React.createElement(AppBox, {url: "data.json"}),
    document.getElementById('content')
);
