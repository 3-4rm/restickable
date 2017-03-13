import React from 'react';
import { render } from "react-dom";
import Sticky from "./react-restickable";
import Highlight from "react-highlight";
import 'bootstrap/scss/bootstrap.scss';
import './styles/app.scss';
import "./styles/plates.scss";
import "./styles/labels.scss";
import "./styles/inputs.scss";
import "./styles/default.scss";


class Root extends React.Component{
  constructor(props){
    super(props);
    this.state={
      offsetTop: 0,
      sticky: false,
      bottoming: false,
      recalcEvery: 1,
      recalcEveryDefault: "false",
      footerSize: 'large',
      spacer: 'default',
      isStickyClassApplied: false,
      handleOnStick: false,
      handleOnUnstick: false,
      handleOnBottom: false
    }
    this.changeSticky = this.changeSticky.bind(this);
    this.changeBottoming = this.changeBottoming.bind(this);
    this.changeRecalcEvery = this.changeRecalcEvery.bind(this);
    this.changeOffsetTop = this.changeOffsetTop.bind(this);
    this.getFooterClassName = this.getFooterClassName.bind(this);
    this.setFooterSize = this.setFooterSize.bind(this);
    this.setSpacer = this.setSpacer.bind(this);
    this.setRecalcEveryDefault = this.setRecalcEveryDefault.bind(this);
    this.changeIsStickyClassApplied = this.changeIsStickyClassApplied.bind(this);
    this.getStickyClass = this.getStickyClass.bind(this);
    this.getOnStickHandler = this.getOnStickHandler.bind(this);
    this.getOnUnstickHandler = this.getOnUnstickHandler.bind(this);
    this.getOnBottomHandler = this.getOnBottomHandler.bind(this);
    this.getRecalcEvery = this.getRecalcEvery.bind(this);
    this.changeHandleOnStick = this.changeHandleOnStick.bind(this);
    this.changeHandleOnUnstick = this.changeHandleOnUnstick.bind(this);
    this.changeHandleOnBottom = this.changeHandleOnBottom.bind(this);

    this.onUnstickText = 'onStick=<span>{</span>()=>{console.log("onUnstick!")<span>}</span>'
  }

  changeSticky (e){
    this.setState({sticky: e.target.checked});
  }

  changeBottoming(e){
    this.setState({bottoming: e.target.checked})
  }

  changeRecalcEvery(e){
    this.setState({recalcEvery: Number(e.target.value)});
  }

  changeOffsetTop(e){
    this.setState({offsetTop: Number(e.target.value)});
  }

  getFooterClassName(){
    if (this.state.footerSize === 'small'){
      return "plate-5"
    }
    if(this.state.footerSize === 'large'){
      return "plate-1"
    }
  }

  setFooterSize(e){
    this.setState({footerSize: e.target.value});
  }

  setSpacer(e){
    console.log(e.target.value)
    this.setState({spacer: e.target.value});
  }

  getSpacer(){
    switch (this.state.spacer) {
      case "false":
        return false
        break;
      default:
        return undefined;
    }
  }

  setRecalcEveryDefault(e){
    this.setState({recalcEveryDefault: e.target.value})
  }

  changeIsStickyClassApplied(e){
    this.setState({isStickyClassApplied: e.target.checked});
  }

  getStickyClass(){
    if(this.state.isStickyClassApplied){
      return "my-sticky-class"
    }else{
      return undefined;
    }
  }

  getRecalcEvery(){
    if(this.state.recalcEveryDefault === 'true'){
      return null;
    }
    return this.state.recalcEvery
  }

  changeHandleOnStick(e){
    this.setState({handleOnStick: e.target.checked});
  }

  changeHandleOnUnstick(e){
    this.setState({handleOnUnstick: e.target.checked});
  }

  changeHandleOnBottom(e){
    this.setState({handleOnBottom: e.target.checked});
  }

  getOnStickHandler(){
    if(this.state.handleOnStick){
      return ()=>{console.log("onstick")}
    }else{
      return undefined;
    }
  };

  getOnUnstickHandler(){
    if(this.state.handleOnUnstick){
      return ()=>{console.log("onunstick")}
    }else{
      return undefined;
    }
  }

  getOnBottomHandler(){
    if(this.state.handleOnStick){
      return ()=>{console.log("onbottom")}
    }else{
      return undefined;
    }
  }


  render(){
    let onUnstickText ='<code>onStick=<span>{</span>()=>{console.log("onUnstick!")<span>}</span></code>';// this.onUnstickText;
    return(
      <div className="application">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="plate-0">
                <h2 className="main-header">Demo page for restickable / react-restickable</h2>
                {/*This is a fork of <a href="https://github.com/leafo/sticky-kit" target="_blank">sticky-kit</a> with removed dependancy on jQuery.<br/>*/}
                For use with React.js react-restickable can be used.<br/>
                The demo is interactive, please use inputs in sticky area below and in footer. Check responsiveness by resizing window.<br/>
                Notice the value of spacer option and behavior on small screens.
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 padding-10">
              <Sticky
                offsetTop={this.state.offsetTop}
                sticky={this.state.sticky}
                bottoming={this.state.bottoming}
                recalcEvery={this.getRecalcEvery()}
                spacer={this.getSpacer()}
                stickyClass={this.getStickyClass()}
                onStick={this.getOnStickHandler()}
                onUnstick={this.getOnUnstickHandler()}
                onBottom={this.getOnBottomHandler()}
                >
                  <div className="plate-2">
                    <div className="row">
                      <div className="col-12">
                        <h6>
                          This area is sticky. Change options below to change its behavior
                        </h6>
                      </div>
                    </div>
                    <div className='row'>
                      <div className="col-12">
                        <table className="options-table">
                          <tbody>
                            <tr>
                              <td>
                                sticky: true
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.sticky} onChange={this.changeSticky}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                bottoming: true
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.bottoming} onChange={this.changeBottoming}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                offsetTop:
                              </td>
                              <td>
                                <input className="text-field-1" type="number" min="0" max="1000" value={this.state.offsetTop} onChange={this.changeOffsetTop}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                spacer:
                              </td>
                              <td>
                                <span className="radio-1"><input type="radio" value={'false'} checked={this.state.spacer === 'false'} onChange={this.setSpacer}/>false</span>
                                <span className="radio-1"><input type="radio" value={'default'} checked={this.state.spacer === 'default'} onChange={this.setSpacer}/>default</span>
                                {/*<span className="radio-1"><input type="radio" value={"#customspacer"} checked={this.state.spacer === "#customspacer"} onChange={this.setSpacer}/>custom</span>*/}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                recalcEvery:
                              </td>
                              <td>
                              <span className="radio-1">
                                <input type="radio" value={"false"} checked={(this.state.recalcEveryDefault === 'false')} onChange={this.setRecalcEveryDefault}/>
                                <input className="text-field-1" type="number" min="1" max="1000" defaultValue="1" onChange={this.changeRecalcEvery}/>
                              </span>
                              <span className="radio-1">
                                <input type="radio" value={"true"} checked={(this.state.recalcEveryDefault === 'true')} onChange={this.setRecalcEveryDefault}/>
                                default (never)
                              </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                stickyClass: "mystickyclass"
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.isStickyClassApplied} onChange={this.changeIsStickyClassApplied}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                onStick:()=>console.log("onStick")
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.handleOnStick} onChange={this.changeHandleOnStick}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                onUnstick: ()=>console.log("onUnstick")
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.handleOnUnstick} onChange={this.changeHandleOnUnstick}/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                onBottom: ()=>console.log("onBottom")
                              </td>
                              <td>
                                <input className="checkbox-1" type="checkbox" checked={this.state.handleOnBottom} onChange={this.changeHandleOnBottom}/>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Sticky>
            </div>
            <div className="col-md-6 padding-10">
                <div className="plate-3">
                <h6>
                    Usage with React.js /ES-6 syntax:
                </h6>
                <div>
                ...npm is on the way...<br/>
                Copy restickable.js and react-restickable.js to your project.<br/>
                Then:

                </div>
{/*<Highlight>{`
npm install react-restickable
`}</Highlight>*/}
              {/*  <h6>
                  Next:
                </h6>*/}
<Highlight>{`
import Sticky from 'react-restickable';

...

<Sticky sticky={true} offsetTop={40}>
  {/*your content goes here*/}
</Sticky>
`}</Highlight>


                  <h6>
                    Usage with pure JavaScript:
                  </h6>

<Highlight>{`
<script src="./restickable.js"/>
...
<div id="yourSticky">
  <!-- your content goes here -->
</div>
<script>
  var options = {
    sticky: true,
    offsetTop: 40
  };
  var sticky = document.getElementById('yourSticky');
  restickable.stickInParent(options, sticky);
</script>
`}</Highlight>

                </div>
            </div>
          </div>
          <div className='row'>
            <div className="col-12">
              <div className={ this.getFooterClassName() } >
                <h2 className="main-header">
                  Page Footer (large or small)
                </h2>
                <div className="col-12">
                    <span className="label-1">Footer Size: </span>
                    <span className="radio-1"><input type="radio" checked={this.state.footerSize === 'large'} value="large" onChange={this.setFooterSize}/>Large</span>
                    <span className="radio-1"><input type="radio" checked={this.state.footerSize === 'small'} value="small" onChange={this.setFooterSize}/>Small</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

render(<Root/>, document.getElementById("appcontainer"));
