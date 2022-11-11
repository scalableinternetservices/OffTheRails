# frozen_string_literal: true

class UserNameOnlySerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name
end
