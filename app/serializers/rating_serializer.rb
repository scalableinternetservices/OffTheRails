class RatingSerializer < ActiveModel::Serializer
  attributes :id, :score, :comment
  belongs_to :user, serializer: UserNameOnlySerializer
end
