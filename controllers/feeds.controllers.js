const FeedService = require("../service/feeds.service");
const FeedInstance = new FeedService();

const getFeeds = async(request, response) => {
    try{
    const result = await FeedInstance.read();
    return response.status(200).json(result);
    }catch(error){
        return response.status(422).json(error)
    }
}

const postFeeds = async(request, response) => {
    try{
    const result = await FeedInstance.add({...request.body});
    return response.status(201).json(result);
    }catch(error){
        return response.status(422).json(error)
    }
}

const deleteFeeds = async(request, response) => {
    const {id} = request.params;
    try{
        const result = await FeedInstance.remove(id);
        return response.status(201).json(result);
    }catch(error){
        return response.status(422).json(error);
    }
}


const updateFeeds = async(request, response) => {
    const {id} = request.params;
    
    try{
        const result = await FeedInstance.edit(id, {...request.body});
        return response.status(200).json(result)
    }catch(error){
        return response.json({message: error.message})
    }

}

const searchFeed = async(request, response) => {
    const {title} = request.query;
    try{    
        const result = await FeedInstance.searchTitle(title);
        return response.status(200).json(result);
    }catch(error){
        return response.json({message: error.message})
    }

}

module.exports = {getFeeds, postFeeds, deleteFeeds, updateFeeds, searchFeed}