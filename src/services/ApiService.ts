export function getDataFromApi() {
  // Get the Data from the Data.Json file
  const fetchData = async (content: string) => {
    try {
      const response = await fetch(content)
      //const responseData = await response.json()
      return response
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
export default getDataFromApi
