class GamesController < ApplicationController
  def index

  end

  def create
    puts "GOT TO THE ROUTE! yay"
    p "*" * 80
    p params[:info]
  end

end
