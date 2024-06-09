import { format } from "date-fns";

const RenderText = ({ text }) => <div> <p>{text}</p></div>
const RenderNumber = ({ number }) => <p>{number}</p>;
const RenderDate = ({ date }) => <p>{format(new Date(date), 'MMMM d, yyyy')}</p>;
const RenderImage = ({ src }) => <img src={src} alt="Dynamic Content" style={{ width: '100%' }} />;
const RenderGeo = ({ geo }) => <p>Lat: {geo.latitude}, Lon: {geo.longitude}</p>;




export { RenderText, RenderNumber, RenderDate, RenderImage, RenderGeo };