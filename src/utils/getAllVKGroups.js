export default async function getAllVKGroups() {
    let start = 1;
    let finish = 500;

    let timerId = setInterval(() => {
        try {
            let ids = getIds(start, finish);
            getGroups(ids);

            start = finish + 1;
            finish = finish + 500;
        } catch (error) {
            console.error(error);
            clearInterval(timerId);
        }
    }, 2000);
}

function getIds(start, finish) {
    let arr = [];
    for (let i = start; i <= finish; i++) {
        arr.push(i);
    }
    return arr.join(", ");
}

async function getGroups(ids) {
    //eslint-disable-next-line no-undef
    await VK.Api.call(
        "groups.getById",
        {
            group_ids: ids,
            extended: 1,
            v: 5.131,
        },
        (r) => {
            if (r.response) {
                console.log(r.response);
                console.log(toCSV(r.response));
            } else {
                console.error("error", r.error.error_msg);
                return r.error.error_msg;
            }
        }
    );
}

// Returns a csv from an array of objects with
// values separated by tabs and rows separated by newlines
function toCSV(array) {
    // Use first element to choose the keys and the order
    var keys = Object.keys(array[0]);

    // Build header
    var result = keys.join(",") + "\n";

    // Add the rows
    array.forEach(function (obj) {
        keys.forEach(function (k, ix) {
            if (ix) result += ",";
            result += obj[k];
        });
        result += "\n";
    });

    return result;
}
