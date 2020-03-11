  <!--MODAL DAR DE BAJA-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
 >
    <div class="modal-dialog" role="document">
        <form id="form-modal" >
            <div class="modal-content">
                <div class="modal-header"><center><h3 id="titulo" class="modal-title" >Registro de Peso </h3></center></div>
                <div class="modal-body">
                    <input type="hidden" id="item_id">
                    <input type="hidden" id="pesaje_galpon_id" name="pesaje_galpon_id" value="<?= $pesaje_galpon_id ?>">  
                
                    <!-- <div class="col"> -->
                    <div class="form-group">
                        <label>Peso *:</label>
                        <input type="number" step="0.001" name="peso" id="peso" class="form-control" required="">
                    </div>
                    <div class="form-group">
                        <label>Peso Anterior pollita :</label>
                        <input type="number" step="0.001"  id="peso_anterior" class="form-control" required="" readonly="">
                    </div>
                    <div class="form-group">
                        <label>Codigo de referencia :</label>
                        <input type="text" name="cod_referencia" id="cod_referencia" class="form-control"  >
                    </div>
                   
                    <div class="form-group">
                        <label>Unidad :</label>
                        <select class="form-control" id="unidad" name="unidad">
                            <option value="GRAMO">GRAMOS</option>
                            <option value="KILO">KILO </option>
                        </select>
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
