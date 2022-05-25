import React from 'react';

const TreadElement = (props) => {
    return (
        <div>
            <div className="post" id={props.item.name}>
                <div className="post__content">
                    <strong> </strong>
                    <div>
                        {props.item.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreadElement;