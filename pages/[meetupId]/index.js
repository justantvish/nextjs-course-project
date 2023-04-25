import { MongoClient, ObjectId } from "mongodb";

import MeetupDetailsLayout from "../../components/meetups/MeetupDetails";

function MeetupDetails(props) {

    
    return (
        <MeetupDetailsLayout
            img={props.MeetupData.image}
            title={props.MeetupData.title}
            address={props.MeetupData.address}
            description={props.MeetupData.description}
        />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://justantvish:220918Neshama@cluster0.1tceys8.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray(); // _id: 1 means include only id

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect('mongodb+srv://justantvish:220918Neshama@cluster0.1tceys8.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: new ObjectId(meetupId)});

    client.close();

    return {
        props: {
            MeetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.data.image,
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                description: selectedMeetup.data.description,
            }
        },
    }
}

export default MeetupDetails;