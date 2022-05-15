using Company_WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Company_WebApi.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class GRNMasterController : ControllerBase
    {
        private readonly CompanyDBContext _context;

        private string SPL_CHAR_FOR_QR = ",";
        private string SPL_CHAR_PIPE = "|";

        public GRNMasterController(CompanyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grnmaster>>> GetGRNMaster()
        {
            try
            {
                return await _context.Grnmasters.FromSqlRaw("exec dbo.spSelectGRNMaster").ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating record" + ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Grnmaster>>> GetGRNMaster(string id)
        {
            var result = await _context.Grnmasters.Where(e => e.Partnumber == id).ToListAsync();
            if (result == null)
            {
                throw new Exception("Record Not found");
            }
            return result;
        }

        [HttpPost("{FilterDate}")]
        public async Task<ActionResult<IEnumerable<Grnmaster>>> PostPriceMaster(string FilterDate)//dd-mm-yyyy
        {
            try
            {
                var parameter =
                        new SqlParameter("@FilterDate", SqlDbType.VarChar)
                        {
                            Direction = ParameterDirection.Input,
                            Value = FilterDate,
                        };
                return await _context.Grnmasters.FromSqlRaw("exec dbo.spSelectGRNMasterByDate @FilterDate", parameter).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error inserting record" + ex);
            }
        }

        [HttpPut]
        public async Task<ActionResult<IEnumerable<Grnmaster>>> PutGRNMaster([FromBody] List<Grnmaster> _Grnmasterlist)
        {
            try
            {
                var json = JsonConvert.SerializeObject(_Grnmasterlist);
                DataTable DatTable = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

                var parameter =
                    new SqlParameter("@typGRNMaster", SqlDbType.Structured)
                    {
                        Direction = ParameterDirection.Input,
                        Value = DatTable,
                        TypeName = "dbo.typeGRNMaster"
                    };
                return await _context.Grnmasters.FromSqlRaw("exec dbo.spUpdateGRNMaster @typGRNMaster", parameter).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating record" + ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Grnmaster>>> PostGRNMaster(List<Grnmaster> _Grnmasterlist)
        {
            try
            {
                var json = JsonConvert.SerializeObject(_Grnmasterlist);
                DataTable DatTable = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));

                var parameter =
                    new SqlParameter("@typGRNMaster", SqlDbType.Structured)
                    {
                        Direction = ParameterDirection.Input,
                        Value = DatTable,
                        TypeName = "dbo.typeGRNMaster"
                    };
                return await _context.Grnmasters.FromSqlRaw("exec dbo.spInsertGRNMaster @typGRNMaster", parameter).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error inserting record" + ex);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteGRNMaster()
        {
            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec dbo.spDeleteGRNMaster");
                return Content("Success");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting record" + ex);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Grnmaster1>>> QRGRNMaster(List<Grnmaster> _Grnmasterlist)
        {
            List<Grnmaster1> resultList = new List<Grnmaster1>();
            try
            {
                
                foreach(Grnmaster grnMaster in _Grnmasterlist)
                {
                    string qrContent = getQRString(grnMaster);

                    Grnmaster1 grnmaster1 = new Grnmaster1();
                    grnmaster1.Grndate = grnMaster.Grndate;
                    grnmaster1.PoorMonumber = grnMaster.PoorMonumber;
                    grnmaster1.Vendorname = grnMaster.Vendorname;
                    grnmaster1.Partnumber = grnMaster.Partnumber;
                    grnmaster1.Partdesc = grnMaster.Partdesc;
                    grnmaster1.RecvQty = grnMaster.RecvQty;

                    QRCodeGenerator _qrCode = new QRCodeGenerator();
                    QRCodeData _qrCodeData = _qrCode.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
                    QRCode qrCode = new QRCode(_qrCodeData);
                    Bitmap qrCodeImage = qrCode.GetGraphic(20);
                    byte[] bytes = BitmapToBytesCode(qrCodeImage);

                    grnmaster1.base64Str = "data:image/jpg;base64," + Convert.ToBase64String(bytes);
                    resultList.Add(grnmaster1);
                }
            }catch(Exception ex)
            {

            }
            return resultList;
        }

        private static byte[] BitmapToBytesCode(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }


        public string getQRString(Grnmaster grnmaster)
        {
            string content = "";
            content += "GRN_DATE" + SPL_CHAR_PIPE + grnmaster.Grndate + SPL_CHAR_FOR_QR;            
            content += "PO_NUM" + SPL_CHAR_PIPE + grnmaster.PoorMonumber + SPL_CHAR_FOR_QR;
            content += "VENDOR_NAME" + SPL_CHAR_PIPE + grnmaster.Vendorname + SPL_CHAR_FOR_QR;            
            content += "PART_NUM" + SPL_CHAR_PIPE + grnmaster.Partnumber + SPL_CHAR_FOR_QR;
            content += "PART_DESC" + SPL_CHAR_PIPE + grnmaster.Partdesc + SPL_CHAR_FOR_QR;
            content += "RECV_QTY" + SPL_CHAR_PIPE + grnmaster.RecvQty + SPL_CHAR_FOR_QR;           

            return content;
        }
    }
}
