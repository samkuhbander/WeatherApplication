<?php 
class final_rest
{



/**
 * @api  /api/v1/setTemp/
 * @apiName setTemp
 * @apiDescription Add remote temperature measurement
 *
 * @apiParam {string} location
 * @apiParam {String} sensor
 * @apiParam {double} value
 *
 * @apiSuccess {Integer} status
 * @apiSuccess {string} message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":0,
 *              "message": ""
 *     }
 *
 * @apiError Invalid data types
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *              "status":1,
 *              "message":"Error Message"
 *     }
 *
 */

public static function setTemp ($date, $location, $low, $high, $forecast)

        {
                if(!is_numeric($low)){
                        $retData["status"]=1;
                        $retData["message"]="'$value' is not numeric";
                }
                else {
                        try {
                                EXEC_SQL("insert into temperature (date, location, low, high, forecast) values (CURRENT_TIMESTAMP,?,?,?,?)",$location, $low, $high, $forecast);
                                $retData["status"]=0;
                                $retData["message"]="On '$date', the forecast for '$location' is '$forecast' with a high of '$high' and a low of '$low'";
                        }
                        catch  (Exception $e) {
                                $retData["status"]=1;
                                $retData["message"]=$e->getMessage();
                        }
                }
                return json_encode ($retData);
        }
	public static function getTemp ($date, $sort)

        {
                        try {
                                if($sort == 1){
                                        $retData["result"] = GET_SQL("select * from temperature where (date=? or ?=' ') order by location",$date, $date);
                                } else {
                                        $retData["result"] = GET_SQL("select * from temperature where (date=? or ?=' ') order by DateRequested",$date, $date);
                                }
                        }
                        catch  (Exception $e) {
                                $retData["status"]=1;
                                $retData["message"]=$e->getMessage();
                        }
                

                return json_encode ($retData);
        }

}
