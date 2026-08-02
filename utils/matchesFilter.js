const matchesFilter = (data, filters) => {

    if (!filters) {
        return true;
    }


    return Object.entries(filters)
        .every(([key, value]) => {

            return data[key] === value;

        });

};


module.exports = matchesFilter;