# frozen_string_literal: true

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_link, :seller_id
  has_many :ratings
end
