async function contactAPI(url,object) {

    if (object == null) {
        let result = await fetch(url);
        return result.json();
    } else {
        let result = await fetch(url, {
        method: 'post',
        headers: { "Content-type": "application/JSON; charset=UTF-8"},
        body: JSON.stringify(object) 
        });
        return result.json();
    }
}