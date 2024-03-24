import React from 'react';
import DOMParserReact, { parse } from 'dom-parser-react'
import db from "../firebase";
import Editor from '../components/Editor';

class EditBlogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        title: this.props.title,
        content: this.props.content,
        blog_id: this.props.blog_id,
        };
    }
    
    // componentDidMount() {
    //     const { id } = this.state;
    //     db.collection("articles")
    //     .doc(id)
    //     .get()
    //     .then((doc) => {
    //         this.setState({
    //         title: doc.data().title,
    //         content: doc.data().content,
    //         });
    //     });
    // }
    
    render() {
        return (
        <>
            <h1>Edit Blog Page</h1>
            <Editor title={this.state.title} content={this.state.content} id={this.state.blog_id} />
        </>
        );
    }
}

export default EditBlogPage;