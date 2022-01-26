import { React, useState,Children } from 'react';
import { useTask } from './hooks';

export default function TaskTab({children}) {
    const{formChange}=useTask();
    const [toggleState, setToggleState] = useState(1);
    const childContent=Children.toArray(children);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                    disabled={(formChange===2 || formChange===3)?true:false}
                >
                    Task Info
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                    disabled={(formChange===1 || formChange===3)?true:false}
                >
                    Planning Data
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                    disabled={(formChange===1 || formChange===2)?true:false}
                >
                    Actual Data
                </button>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content active-content" : "content"}
                >
                    {childContent[0]}
                </div>

                <div
                    className={toggleState === 2 ? "content active-content" : "content"}
                >
                    {childContent[1]}
                </div>

                <div
                    className={toggleState === 3 ? "content active-content" : "content"}
                >
                </div>
            </div>
        </div>
    );
}