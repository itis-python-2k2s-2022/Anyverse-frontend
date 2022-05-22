import React from 'react';

const CategoryElement = (props) => {

    return (
        <a href={"/category/" + props.item._id}>
            <div className="post" id={props.item.name}>
                {console.log(';;;;;')}
                <div className="post__content">
                    <strong> </strong>
                    <div>
                        {props.item.name}
                    </div>
                    {/*<div>*/}
                    {/*    {props.item}*/}
                    {/*</div>*/}
                </div>
            </div>
        </a>
    );
};

export default CategoryElement;