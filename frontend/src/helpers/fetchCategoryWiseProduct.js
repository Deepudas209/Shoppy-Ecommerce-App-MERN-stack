const { default: SummaryApiOne } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryApiOne.categoryWiseProduct.url,{
        method: SummaryApiOne.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct