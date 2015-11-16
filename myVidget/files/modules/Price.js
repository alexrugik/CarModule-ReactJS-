var Price = React.createClass({
    loadPrice: function () {
        this.disablePrice();
        this.handleClick();
        this.enableButton();
        if (document.getElementById("button").getAttribute("value") == "true") {
            $.ajax({
                method: 'POST',
                url: this.props.url,
                dataType: 'json',
                cache: false,
                data: JSON.stringify(this.myObject()),
                success: function (data) {
                    this.setState({price: data})
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
            document.getElementById("button").setAttribute("value", "false");
        }
    },

    getInitialState: function () {
        return {price: []}
    },

    componentDidMount: function () {
        this.loadPrice();
        setInterval(this.loadPrice, this.props.pollInterval)
    },

    myObject: function () {
        return {
            id: null,
            car: this.createCar(),
            region: {ru: "Киевский регион", id: 1, uk: "Київський регіон"},
            contact: {email: null, lang: "ru"},
            clarification: false
        }
    },

    createCar: function () {
        var car = {
            year: this.getYear(),
            maker: this.getMaker(),
            model: this.getModel(),
            seria: this.getSeries(),
            modification: this.getModification(),
            drivable: true,
            damaged: false,
            commercial_purposes: false,
            loss_flood: false,
            odometer_changed: false,
            accident: false,
            odometer: this.getOdometer()
        };
        return car;
    },

    getYear: function () {
        if ($(".years option:selected").val()) {
            var val = $(".years option:selected").val();
            return val;
        }
    },

    getMaker: function () {
        if ($(".manufacturer option:selected").val()) {
            var val = $(".manufacturer option:selected").attr('value');
            var arr = [3];
            arr = val.split("!");
            return {
                id: $(".manufacturer option:selected").attr('id'),
                slug: arr[0],
                ru_name: arr[1],
                uk_name: arr[2]
            };
        }
    },

    getModel: function () {
        if ($(".model option:selected").val()) {
            var val = $(".model option:selected").attr('value');
            var arr = [2];
            arr = val.split("!");
            return {
                id: $(".model option:selected").attr('id'),
                ru_name: arr[0],
                uk_name: arr[1],
                show_price_range: false,
                ignore_price: false
            };
        }
    },

    getSeries: function () {
        if ($(".series option:selected").val()) {
            var val = $(".series option:selected").attr('value');
            var arr = [2];
            arr = val.split("!");
            return {
                id: $(".series option:selected").attr('id'),
                ru_name: arr[0],
                uk_name: arr[1]
            }
        }
    },

    getModification: function () {
        if ($(".body option:selected").val()) {
            var val = $(".body option:selected").attr('value');
            var arr = [5];
            arr = val.split("!");
            return {
                id: $(".body option:selected").attr('id'),
                src: arr[0],
                slug: arr[1],
                alt: arr[2],
                ru_name: arr[3],
                uk_name: arr[4],
            };
        }
    },

    getOdometer: function () {
        return $(".odometer option:selected").attr("value");
    },

    handleClick: function () {
        var button = document.getElementById("button");
        button.addEventListener("click", function () {
            button.setAttribute("value", "true");
            document.getElementById("pr").style.display = "block";
        });
    },

    disablePrice : function() {
        if(document.getElementById("pr").style.display == "block") {
            var body = document.getElementById("selectBody");
            body.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";

            });
            var years = document.getElementById("selectYears");
            years.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";

            });
            var manufacturer = document.getElementById("selectManufacturer");
            manufacturer.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";

            });
            var series = document.getElementById("selectSeries");
            series.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";

            });
            var model = document.getElementById("selectModel");
            model.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";
            });
            var odometer = document.getElementById("selectOdometer");
            odometer.addEventListener("change", function () {
                document.getElementById("pr").style.display = "none";
            });
        }
    },

    enableButton: function () {
        var button = document.getElementById("button");
        if ($("#selectOdometer").val() != "Выберите пробег" &&
            $("#selectBody").val() != "Выберите модификацию") {
            button.removeAttribute("disabled");
        }
        else {
            button.setAttribute("disabled", "disabled");
        }
    },
    render: function () {
        return (
            <div><Component data={this.state.price}/></div>
        )
    },
});

var Component = React.createClass({
    render: function () {
        var price;
        if (this.props.data.price) {
            price = "Цена вашего автомобиля может достигать " + this.props.data.price + " $";
        }
        else {
            price = "Недостаточно данных для оценки!"
        }
        return (
            <div id="pr">{price}</div>
        )
    }
});

ReactDOM.render(
    <Price url="https://www.etachki.com/api/ext/2a11fcea-0e57-469a-b1e9-93cea09628f9/determine_price"
           pollInterval={100}/>,
    document.getElementById("price")
)
