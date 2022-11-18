# frozen_string_literal: true

class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_link, :seller_id, :quantity, :show
  has_many :ratings
end
