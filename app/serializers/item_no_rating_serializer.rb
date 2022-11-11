class ItemNoRatingSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_link, :seller_id
end
