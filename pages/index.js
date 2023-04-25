import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {

    return (
        <>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         },
//     };
// }

export async function getStaticProps() {
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://justantvish:220918Neshama@cluster0.1tceys8.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10,
    };
};

export default HomePage;