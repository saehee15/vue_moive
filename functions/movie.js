const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event) {
    console.log(event)
    const payload = JSON.parse(event.body)
    const { title, type, year, page, id } = payload
    const url = id
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    try {
        const { data } = await axios.get(url)
        if (data.Error) {
            return {
                statusCode: 400,
                // body 에는 문자데이터 반환해야함, 객체, 배열은 제대로 반환할수없음, 따라서 밑에는 stringify씀
                body:data.Error
            }
        }
        return {
            statusCode: 200,
            body:JSON.stringify(data)
        }
    } catch (error) {
        return {
            statusCode: error.response.status,
            body: error.message
        }
    }
}