# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.new({email: FFaker::Internet.email, password: 'password', password_confirmation: 'password'})
user1.save

user2 = User.new({email: FFaker::Internet.email, password: 'password', password_confirmation: 'password'})
user2.save


10.times do |n|
  indicationElements = ['Before food', 'After food'].shuffle.first
  timeElements = ['Morning', 'Night'].shuffle.first
  user1.med.create({name: FFaker::Product.brand, indication: indicationElements, frequency: FFaker::Random.rand(1..3), time: timeElements, duration: FFaker::Random.rand(3..30), dosage: FFaker::Random.rand(1..3).to_s+" tablet(s)", date_start: DateTime.now, user_id: 1})
end
