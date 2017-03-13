import React from 'react';
import  {restickable}  from './restickable';


class ReactRestickable extends React.Component{

  constructor(props){
    super(props);
    this.balance = this.balance.bind(this);
  };

  createStickyOptionsFromProps(props){
    var options = {
      bottoming: props.bottoming,
      innerScrolling: props.innerScrolling,
      offsetTop: props.offsetTop,
      parent: props.parent,
      recalcEvery: props.recalcEvery,
      spacer: props.spacer,
      stickyClass: props.stickyClass,
      onUnstick: props.onUnstick,
      onStick: props.onStick,
      onBottom: props.onBottom
    }
    return options;
  }

  componentWillReceiveProps(nextProps){

    if(restickable.detach){
      restickable.detach();
    };
    if(nextProps.sticky){
      var sticker = this.refs.sticker;
      var stickyOptions = this.createStickyOptionsFromProps(nextProps);
      restickable.stickInParent(stickyOptions, sticker);

      //window.addEventListener("scroll", this.balance);
    }

  }

  balance(){

    var sticker = this.refs.sticker;
    var balancer = document.querySelector(this.props.balancer);
    var footer = document.querySelector(this.props.footer);

    if(!sticker || !balancer){
      return;
    }

    var stickerHeight = sticker.offsetHeight || 0;
    var balancerMarginBottomMinimum = this.props.balancerMarginBottomMinimum || 0;
    var footerHeight = Math.floor(footer.offsetHeight) || 0;
    var documentHeight = document.documentElement.offsetHeight || 0;
    var offsetTop = this.props.offsetTop || 0;
    var balancerMarginBottom = documentHeight - footerHeight - (stickerHeight + offsetTop);

    if(balancerMarginBottom < balancerMarginBottomMinimum){
      balancerMarginBottom = balancerMarginBottomMinimum;
    };

    balancer.style['margin-bottom'] = balancerMarginBottom + "px";
  }

  componentDidMount(){
    var sticker = this.refs.sticker;
    var stickyOptions = this.createStickyOptionsFromProps(this.props);
    if(this.props.sticky){
      restickable.stickInParent(stickyOptions, sticker);
    }
    //window.addEventListener("scroll", this.balance);
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.balance);
    restickable.detach();
  }

  render(){
    return( <div className={this.props.className} ref="sticker">
              {this.props.children}
            </div>)
  }
}

ReactRestickable.propTypes = {
  balancer: React.PropTypes.string,
  balancerMarginBottomMinimum: React.PropTypes.number,
  bottoming: React.PropTypes.bool,
  innerScrolling: React.PropTypes.bool,
  offsetTop: React.PropTypes.number,
  parent: React.PropTypes.string,
  recalcEvery: React.PropTypes.number,
  spacer: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
  stickyClass: React.PropTypes.string,
  onBottom: React.PropTypes.func,
  onStick: React.PropTypes.func,
  onUnstick: React.PropTypes.func,
  sticky: React.PropTypes.bool
}

ReactRestickable.defaultProps = {

};

export default ReactRestickable;
