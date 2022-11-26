# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

starting_user_id = User.all.count + 1

100.times do |i|
  User.create!(first_name: "FN#{i}", last_name: "LN#{i}", email: "e#{i + starting_user_id}@mail.com", password: 'pw')
  10.times do |_j|
    Item.create!(name: 'Item',
                 image_link: 'https://cdn.discordapp.com/attachments/491865379748970506/556673542431834114/jacket_full.png',
                 price: 10.00, seller_id: i + starting_user_id, quantity: 999, show: true)
  end
  5.times do |_j|
    o = Order.create!(purchased: false, user_id: i + starting_user_id)
    10.times do |k|
      OrderItem.create!(quantity: 1, order_id: o.id, item_id: k + 1)
      Rating.create!(score: 5, comment: 'Great item!', user_id: i + starting_user_id, item_id: k + 1)
    end
  end
end
