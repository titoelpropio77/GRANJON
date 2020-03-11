  <!--MODAL DAR DE BAJA-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
 >
    <div class="modal-dialog" role="document">
        <form id="form-modal" >
            <div class="modal-content">
                <div class="modal-header"><center><h3 id="titulo" class="modal-title" >Registro de grupo GALPON N°: <?= $galpon[0]->nombre  ?></h3></center></div>
                <div class="modal-body">
                    <input type="hidden" id="item_id">
                    <input type="hidden" id="nombre_b">  
                    <input type="hidden" id="edad_id" value="<?= $galpon[0]->id_edad ?>">  
                    <!-- <div class="col"> -->
                    <div class="form-group">
                        <label>Grupo/Semana :</label>
                        <input type="text" name="cod_grupo" id="cod_grupo" class="form-control" required="" value="<?= $semanas.'-'.\date('Y') ?>">
                    </div>
                    <div class="form-group">
                        <label>Fecha :</label>
                        <div class="form-group">
                            <div class='input-group date' id='datetimepicker'>
                                <input  required="" type='text' class="form-control" name="fecha" id="fecha" value="<?= \date('d/m/Y') ?>" style="font-size:20px;text-align:center" />
                                <span class="input-group-addon ">
                                    <span class="fa fa-calendar" aria-hidden="true"></span>  <!--span class="glyphicon glyphicon-calendar"></span-->
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Estado :</label>
                        <select class="form-control" id="estado" name="estado">
                            <option value="0">En proceso de pensaje</option>
                            <option value="1">Teminado</option>
                            <option value="2">Anulado</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Observacion :</label>
                        <textarea class="form-control" name="observacion" id="observacion" row="50"></textarea>
                    </div>
                                            
                    <!-- </div> -->
                    <!-- <input type="text" name="fecha"> -->
                </div>

                <div class="modal-footer">
                    <button id="baja"  class="btn btn-primary">Guardar</button>
                    <button data-dismiss="modal"  class="btn btn-danger ">Cancelar</button>
                </div>
            </div>
        </form>
    </div>
</div>
