# frozen_string_literal: true

class ItemNoRatingSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_link, :seller_id, :quantity, :show
end
