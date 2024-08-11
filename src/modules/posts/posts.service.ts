import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDocument, PostEntity } from "./schema/post.schema";
import mongoose, { Model } from "mongoose";
import { ResponseCode } from "../../exceptions";
import { UpdatePostDto } from "./dto/updatePost.dto";
import { CreatePost } from "./dto/createPost.dto";
import { LocationDto } from "./dto/location.dto";
import { FilterDto } from "./dto/filterPost.dto";
import { SearchDto } from "./dto/search.dto";
import { CommentEntity, CommentDocument } from "../comments/schema/comments.schema";
// import { UpdatePostDto } from "./dto/posts-update.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostEntity.name) private schemaModel: Model<PostDocument>,
    @InjectModel(CommentEntity.name) private commentModel: Model<CommentDocument>,

  ) { }

  ///////////////////CREATE POSTS
  async create(createDto: CreatePost) {
    const create: PostDocument = new this.schemaModel(createDto);
    return await create.save().catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
  }

  ///////////////////////ALL POSTS
  async findall(page = 1, limit = 20) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await this.schemaModel.find().exec();
    const totalPages = Math.ceil(totalCount.length / limit);
    const data = await this.schemaModel
      .aggregate([
        {
          $skip: startIndex,
        },
        {
          $limit: endIndex,
        },
      ])
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });

    return {
      totalCount: totalCount.length,
      totalPages: totalPages,
      data: data,
    };
  }


  /////////////////////FIND BY POSTID
  async findById(postId: string): Promise<PostDocument> {
    return this.schemaModel
      .findById(postId).exec();
  }




  ////////////////////UPDATE POSTS
  async update(id: string, updateDataDto: UpdatePostDto, cid: string) {
    try {
      const verify = await this.schemaModel.findById(id);

      if (!verify) {
        throw new HttpException('Post not found', ResponseCode.NOT_FOUND);
      }

      if (verify.userId.toString() !== cid) {
        throw new HttpException('Unauthorized', ResponseCode.UNAUTHORIZED);
      }

      // Ensure location field is in the correct format if it is being updated
      if (updateDataDto.location && updateDataDto.location.coordinates) {
        updateDataDto.location.type = 'Point';
      }

      const updateData = await this.schemaModel
        .findByIdAndUpdate(id, updateDataDto, { new: true })
        .exec();

      return { data: updateData };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }


  ////////////////////////MY POSTS
  async findMy(id: string) {
    try {
      const data = await this.schemaModel.find({ userId: id }).exec();
      console.log(data)
      return {
        data,
      };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }

  //////////////////////POSTS WITHIN RADIUS
  async getWithinRadius(locationDto: LocationDto): Promise<any> {

    const pipeline = [];
    const radius = locationDto.radius



    const [longitude, latitude] = locationDto.location.coordinates;

    pipeline.push({
      $match: {
        location: {
          $geoWithin: {
            $centerSphere: [
              [longitude, latitude],
              radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
            ],
          },
        },
      },
    });


    const events = await this.schemaModel.aggregate(pipeline);
    console.log(events)

    if (events) {
      return events;
    }
    else {
      throw new HttpException("no post found", ResponseCode.BAD_REQUEST);
    }

  }

  //////////////////////FILTER POSTS
  async filterEvents(filterDto: FilterDto): Promise<any> {

    const isUrgent = filterDto.isUrgent;
    const isFree = filterDto.isFree;
    const isCompleted = filterDto.isCompleted;
    const location = filterDto.location;
    const radius = filterDto.radius;


    // Prepare match stage based on provided filters

    const pipeline = [];

    // Geospatial query stage
    if (location && location.coordinates && radius) {
      const [longitude, latitude] = location.coordinates;
      pipeline.push({
        $match: {
          location: {
            $geoWithin: {
              $centerSphere: [
                [longitude, latitude],
                radius / 6371.1, // Convert radius from meters to radians (earth radius is approximately 6371.1 km)
              ],
            },
          },
        },
      });
    }
    if (isUrgent) {
      pipeline.push({ $match: { isUrgent }, });
    }

    if (isFree) {
      pipeline.push({ $match: { isFree }, });
    }
    if (isCompleted) {
      pipeline.push({ $match: { isCompleted } });
    }

    // Execute aggregation pipeline
    const events = await this.schemaModel.aggregate(pipeline);
    if (events) {

      return events;

    }
    else {
      throw new HttpException("no post found", ResponseCode.BAD_REQUEST);
    }

  }


  //////////////////////COMPLETED
  async completed(id: string, cid: string) {
    try {
      const verify = await this.schemaModel.findById(id);

      if (!verify) {
        throw new HttpException('Post not found', ResponseCode.NOT_FOUND);
      }

      if (verify.userId.toString() !== cid) {
        throw new HttpException('Unauthorized', ResponseCode.UNAUTHORIZED);
      }
      const isCompleted = true;
      const updateData = await this.schemaModel
        .findByIdAndUpdate(id, { isCompleted }, { new: true })
        .exec();

      return { data: updateData };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }


  //Search Events
  async searchEvents(searchDto: SearchDto): Promise<any> {

    const name = searchDto.title;
    const events = await this.schemaModel.aggregate([
      {
        $match: {
          title: { $regex: `.*${name}.*`, $options: "i" },
        },
      },
    ]);

    if (events) {

      return events;

    }
    else {
      throw new HttpException("no post found", ResponseCode.BAD_REQUEST);
    }

  }



  ///////////////DELETE POSTS
  async deletePost(id: string) {
    return await this.schemaModel
      .findByIdAndDelete(id)
      .exec()
      .catch((err) => {
        throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
      });
  }


  /////////////////////POST WITH ALL COMMENTS

  async getPostWithAllComments(postId: string) {

    const post = await this.schemaModel.findById(postId).exec();
    if (!post) {
      return null;
    }


    const commentsWithReplies = await this.commentModel.aggregate([
      // Match top-level comments for the specified post
      { $match: { postId: new mongoose.Types.ObjectId(postId), parentCommentId: null } },

      // Use $graphLookup to perform recursive lookup for replies
      {
        $graphLookup: {
          from: 'commententities',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parentCommentId',
          as: 'allReplies',
          depthField: 'depth',
        }
      },

      // Transform allReplies into a nested replies structure
      {
        $addFields: {
          replies: {
            $filter: {
              input: '$allReplies',
              as: 'reply',
              cond: { $eq: ['$$reply.parentCommentId', '$_id'] }
            }
          }
        }
      },

      // Recursively nest the replies
      {
        $addFields: {
          replies: {
            $function: {
              body: function (replies, allReplies) {
                const nestReplies = (comments) => {
                  comments.forEach(comment => {
                    comment.replies = allReplies.filter(reply => String(reply.parentCommentId) === String(comment._id));
                    nestReplies(comment.replies);
                  });
                  return comments;
                };
                return nestReplies(replies);
              },
              args: ['$replies', '$allReplies'],
              lang: 'js'
            }
          }
        }
      },

      // Project fields to return
      {
        $project: {
          content: 1,
          userId: 1,
          postId: 1,
          replies: 1,
          _id: 1
        }
      }
    ]).exec();

    return { ...post.toObject(), comments: commentsWithReplies };
  }




  //////////////////////////POSTS BY USERID
  async findByUserId(id: string): Promise<any> {
    const post = await this.schemaModel.find({ userId: id }).exec();

    return post;
  }



}
