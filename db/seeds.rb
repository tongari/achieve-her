# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

100.times do |n|
  name = Faker::Name.name
  email = Faker::Internet.email
  password = "password"
  User.create!(
    name: name,
    email: email,
    password: password,
    password_confirmation: password,
    )
end

(1..100).each{|n|
  Blog.create(
    title: "タイトルその#{n}",
    content: "ないようの#{n}",
    user_id: n
  )
}

# n = 1
# while n <= 100
#   Blog.create(
#     title: "あああ",
#     content: "hoge",
#     user_id: n
#   )
#   n = n + 1
# end