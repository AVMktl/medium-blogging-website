import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const TextEditor = ({value, setValue}: {value: string, setValue:any}) => {

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block', 'link'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent                    // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const modules = {
        toolbar: toolbarOptions
    }

    return(
        <div style={{height: 'calc(300px + 46px)'}}>
            <ReactQuill modules={modules} className="h-3/5" style={{height: 'calc(300px)', 'outline': 'none'}} placeholder='Tell your story...' theme='snow' value={value} onChange={setValue} />
        </div>
    )
}