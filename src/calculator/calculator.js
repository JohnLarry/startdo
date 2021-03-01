import React, {Component} from "react";
import "./calculator.scss";

export default class Calc extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="calculator">
                <div className="output">
                    <div className="upper-output">123-</div>
                    <div className="lower-output">231</div>
                </div>
                
                   
                    <button className="digit-one">1</button>
                    <button className="digit-two">2</button>
                    <button className="digit-three">3</button>
                    <button  className="digit-four">4</button>
                    <button className="digit-five">5</button>
                    <button className="digit-six">6</button>
                    <button className="digit-seven">7</button>
                    <button className="digit-eight">8</button>
                    <button className="digit-nine">9</button>
                    <button className="digit-zero">0</button>
                    <button className="digit-dot">.</button>
                    <button className="oprand-minus">-</button>
                    <button className ="span-two operand-plus">+</button>
                    <button className="operand-multiple">*</button>
                    <button className="operand-divide">/</button>
                    <button className="clear">C</button>
                    <button className="delete">DEL</button>
                    <button className ="span-two equals">=</button>
                    

                
            </div>

        );
    }
}