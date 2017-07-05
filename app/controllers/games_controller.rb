class GamesController < ApplicationController
  def index
    @rails_side_json = { :name => 'Will', :age => 23 }.to_json
  end

  def create
    puts "GOT TO THE ROUTE! yay"
    p "*" * 80
    p params[:info]
  end

  def preload
    # ActiveSupport::JSON.encode({ team: 'rails', players: '36' })
    "string!"
  end

end
