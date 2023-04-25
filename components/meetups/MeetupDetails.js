import styles from './MeetupDetails.module.css';

function MeetupDetailsLayout(props) {
    return (
        <section className={styles.details}>
            <img
                src={props.img}
                alt={props.title}
            />
            <h1>{props.title}</h1>
            <div>{props.address}</div>
            <p>{props.description}</p>
        </section>
    );
}

export default MeetupDetailsLayout;
