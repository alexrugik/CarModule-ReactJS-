var Department = React.createClass({
    loadDepartment : function(){
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            cache: false,
            data:
            {
                region: '1' /*this.getSelectedRegionId*/,
            },
            success: function(data) {
                this.setState({department: data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    },

    getInitialState: function(){
        return {department: []}
    },

    componentDidMount: function() {
        this.loadDepartment();
        setInterval(this.loadDepartment, this.props.pollInterval)
    },

    getSelectedRegionId: function() {
        var val;
        console.log(val = $(".region option:selected").attr('id'));
        return val;
    },

    render : function() {
        return (
            <select className="body">
                <option></option>
                {this.state.department.map(function(item){
                    return <option id={item.id}>{item}</option>
                })}
            </select>
        );

    }
})




ReactDOM.render (
    <Department url="https://www.etachki.com/api/ext/2a11fcea-0e57-469a-b1e9-93cea09628f9/getDepartments" pollInterval={2000} />,
    document.getElementById("department")
);


