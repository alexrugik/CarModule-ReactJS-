var AllRegions  = React.createClass({

    loadAllRegion : function () {
        $.ajax({
            url: this.props.url ,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.regions});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentWillMount : function() {
        this.loadAllRegion();
    },

    render : function () {
       return (
        <select className="region">
            <option>Выберите отделение</option>
            {this.state.data.map(function(item){
                return <Component key={item.id} data={item}/>
            })}
        </select>

       );


    }
});

var Component = React.createClass({
    render : function() {
        return (
            <option id={this.props.data.id}>{this.props.data.ru}</option>
        )
    }
})
ReactDOM.render (
    <AllRegions url="https://www.etachki.com/api/ext/bb113842-b4ec-4102-9594-92f8b3ace91c/getAllRegions" pollInterval={1000} />,
    document.getElementById("region")
);

