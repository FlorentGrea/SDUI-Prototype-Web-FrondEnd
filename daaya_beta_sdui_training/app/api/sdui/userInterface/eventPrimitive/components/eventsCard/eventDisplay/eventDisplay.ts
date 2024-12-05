export default async function eventDisplay() {
    const response = await fetch(`http://localhost:3000/api/eventPicked`);
    const eventPicked = await response.json();

    if (eventPicked.id == '') {
        return {
            type: 'Container',
            props: {
                className: 'hidden'
            }
        };
    }
    return {
        type: 'Container',
        props: {
            contextTiedTo: 'eventsCard',
            existValue: {
                include: 0,
                selectedId: eventPicked.id,
            },
            className: 'w-full h-full bg-black'
        },
        children: [
            {
                type: 'Text',
                props: {text: eventPicked.name}
            }
        ]
    }
}