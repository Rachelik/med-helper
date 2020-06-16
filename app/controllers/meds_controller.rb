class MedsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:edit, :update, :destroy]
  before_action :set_med, only: [:show, :edit, :update, :destroy]

  # GET /meds
  # GET /meds.json
  def index
    @meds = current_user.meds.all

    respond_to do |format|
      format.json {
          render :json => @meds,
          include: :user
      }
      format.html
    end
  end

  # GET /meds/1
  # GET /meds/1.json
  def show
    @med = Med.find(params[:id])
  end

  # GET /meds/new
  def new
    @med = Med.new
  end

  # GET /meds/1/edit
  def edit
  end

  # POST /meds
  # POST /meds.json
  def create
    @med = Med.new(med_params)
    @med.user = current_user

    respond_to do |format|
      if @med.save
        format.html { redirect_to @med, notice: 'Med was successfully created.' }
        format.json { render :show, status: :created, location: @med }
      else
        format.html { render :new }
        format.json { render json: @med.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /meds/1
  # PATCH/PUT /meds/1.json
  def update
    respond_to do |format|
      if @med.update(med_params)
        format.html { redirect_to @med, notice: 'Med was successfully updated.' }
        format.json { render :show, status: :ok, location: @med }
      else
        format.html { render :edit }
        format.json { render json: @med.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /meds/1
  # DELETE /meds/1.json
  def destroy
    @med.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_med
      @med = Med.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def med_params
      params.require(:med).permit(:name, :indication, :frequency, :time, :dosage, :date_start, :duration)
    end


    def authenticate_user!
      if user_signed_in?
        @current_user = current_user
      end
    end
end
