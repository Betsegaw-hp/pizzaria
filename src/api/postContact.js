export default async function postContact(name, email, message) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    });

    if(!res.ok) {
        const { error } = await res.json();
        throw new Error("Network response wa not ok. ",error);
    }

    return await res.json();
}