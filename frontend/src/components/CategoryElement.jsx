import React from 'react';

const CategoryElement = (props) => {
      return (
        <a href={"/category/" + props.item._id}>
            <div className="post" id={props.item.name}>
                <div className="post__content">
                     <img src={"http://127.0.0.1:8000/" + props.item.image}/>
                    <div>
                        {props.item.name}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default CategoryElement;