<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model 
                                  
{
    
use  SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'categoria';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['tipo','nombre'];
    protected $dates=['deleted_at'];
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */


    }
