var Body = React.createClass({

    loadBody: function () {
        this.handleChange();
        if (document.getElementById("selectSeries").getAttribute("value") == "true") {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                data: {seria: this.getSelectedSeries},
                success: function (data) {
                    this.setState({body: data})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            document.getElementById("selectSeries").setAttribute("value", "false");
        }
    },

    getInitialState: function () {
        return {body: []}
    },

    componentDidMount: function () {
        this.loadBody();
        setInterval(this.loadBody, this.props.pollInterval)
    },

    getSelectedSeries: function () {
        return $(".series option:selected").attr('id');
    },

    handleChange: function () {
        var series = document.getElementById("selectSeries");
        series.addEventListener("change", function () {
            series.setAttribute("value", "true");
            document.getElementById("selectBody").removeAttribute("disabled")
        });
        var years = document.getElementById("selectYears");
        years.addEventListener("change", function () {
            document.getElementById("selectBody").setAttribute("disabled", "disabled");
            $('#selectBody').prop('selectedIndex', 0);
        });
        var manufacturer = document.getElementById("selectManufacturer");
        manufacturer.addEventListener("change", function () {
            document.getElementById("selectBody").setAttribute("disabled", "disabled");
            $('#selectBody').prop('selectedIndex', 0);
        });
        var model = document.getElementById("selectModel");
        model.addEventListener("change", function () {
            document.getElementById("selectBody").setAttribute("disabled", "disabled");
            $('#selectBody').prop('selectedIndex', 0);
        });
    },

    render: function () {
        return (
            <select className="body" id="selectBody" disabled="disabled">
                <option>Выберите модификацию</option>
                {this.state.body.map(function (item) {
                    return <Component key={item.id} data={item}/>
                })}
            </select>
        );
    }
});

var Component = React.createClass({
    render: function () {
        return (
            <option id={this.props.data.id} value={this.props.data.src + "!" + this.props.data.slug + "!" +
                        this.props.data.alt + "!" + this.props.data.ru_name + "!" + this.props.data.uk_name}>
                {this.props.data.alt}</option>
        )
    }
});

ReactDOM.render(
    <Body url="https://www.etachki.com/api/ext/2a11fcea-0e57-469a-b1e9-93cea09628f9/getBody" pollInterval={100}/>,
    document.getElementById("body")
);



