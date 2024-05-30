const FeedsModel = require("../model/feeds.models");

class FeedService {
    read = async() => {
        try{
            const result = await FeedsModel.find();;
            return result;
        }catch(error){
            throw error;
        }
    }
    add = async(body) => {
        try{
            const Feeds = new FeedsModel({...body});
            const result = await Feeds.save();
            return result;
        }catch(error){
            throw error
        }
    }
    remove = async(id) => {
        try{
            const result = await FeedsModel.findOneAndDelete({_id: id});
            return result;
        }catch(error){
            throw error
        }
    }

    edit = async(id, body) => {
        try{
            const result = await FeedsModel.findOneAndUpdate({_id: id}, {...body}, {new: true});
            return result;
        }catch(error){
            throw error;
        }
    }

    searchTitle = async(title) => {
        try{
            const result = await FeedsModel.find({title: {$regex: new RegExp(title)}});
            return result;
        }catch(error){
            throw error
        }
    }

}

module.exports = FeedService;