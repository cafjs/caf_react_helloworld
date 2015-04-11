var React = require('react');
var rB = require('react-bootstrap');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var ListNotif = require('./ListNotif');
var AppStatus = require('./AppStatus');

var cE = React.createElement;

var MyApp = {
    getInitialState: function() {
        return AppStore.getState();
    },
    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },
    _onChange : function(ev) {
        this.setState(AppStore.getState());
    },
    doIncrement : function(ev) {
        ev.stopPropagation();
        var inc = parseInt(document.getElementById('inc').value);
        AppActions.increment(inc);
    },
    render: function() {
        return cE("div", {className: "container-fluid"},
                  cE(rB.Panel, {header: cE('h1', null,
                                           cE(AppStatus,
                                              {isClosed: this.state.isClosed}),
                                           " Counter Example")},
                     cE(rB.Panel, {header: "Update Counter"},
                        cE(rB.Grid, null,
                           cE(rB.Row, null,
                              cE(rB.Col, {sm:6},
                                 cE('p', null, "Current Value ",
                                    cE(rB.Badge, null, this.state.counter)
                                   )
                                ),
                              cE(rB.Col, {sm:2},
                                 cE(rB.Button, {onClick: this.doIncrement,
                                                bsStyle: 'primary'},
                                    'Increment')
                                ),
                              cE(rB.Col, {sm: 3},
                                 cE(rB.Input, {type: 'text', id: 'inc',
                                               defaultValue: '1'})
                                )
                             )
                          )
                       ),
                     cE(rB.Panel, {header: "Last Notification"},
                        cE(ListNotif, {notif :this.state.notif})
                       )
                    )
                 );
    }
};

module.exports = React.createClass(MyApp);