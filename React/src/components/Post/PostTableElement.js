import { format } from 'date-fns';
import { RenderText, RenderNumber, RenderDate, RenderImage, RenderGeo } from './PostTemplate.js';


function PostTableElement({ post }) {
    const { _id, username, template, upVotes, downVotes, comments, createdAt, lastModificationDate } = post;
    const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');
    const { templateName, fieldsNames, fieldsTypes, fieldsValues, userId } = template;
    console.log("post", post)

    


    return (
        <tr>
          <div className='post-info-areaa'>
            <td className='post-infos'> Posted By {username} on {formattedDate}</td>
            <td className='post-infos'> Template Name: {templateName}</td>
            </div>
            {fieldsTypes.map((fieldType, index) => {
           
                return (
                    <div>
                        
                    <div key={index}>

                        {fieldType === 'text' && <RenderText text={fieldsValues[index]} />}
                        {fieldType === 'Number' && <RenderNumber number={fieldsValues[index]} />}
                        {fieldType === 'Date' && <RenderDate date={fieldsValues[index]} />}
                        {fieldType === 'Image' && <RenderImage src={fieldsValues[index]} />}
                        {fieldType === 'Geolocation' && <RenderGeo geo={fieldsValues[index]} />}
                    </div>
                    </div>
                );


            })}
           
        </tr>
    );

}

export default PostTableElement;
