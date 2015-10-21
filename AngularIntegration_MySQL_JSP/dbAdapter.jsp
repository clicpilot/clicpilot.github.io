

<%!
static interface CallBackMethod{
    public void run();
}
static interface ErrorCallBackMethod{
    public void run(Exception e);
}
static interface SQLParamProvider {
    public SQLParam[] get();
}
static interface SQLResultProvider {
    public  SQLResult[] get();
}
static class SQLParam {
    int idx;
    String type;
    String val;
    SQLParam(int idx, String type, String val) {
        this.idx = idx;
        this.type = type;
        this.val = val;     
    }
}

static class SQLResult {
    int idx;
    String type;
    String key;
    Map<String, Object>[] map;
    SQLResult(int idx, String type, String key, Map<String, Object>[] map) {
        this.idx = idx;
        this.type = type;
        this.key = key; 
        this.map = map;    
    }
}
static class SQLTask {
    String sql;
    String type;
    SQLParam[] param;
    SQLResult[] result;
    CallBackMethod succ;
    ErrorCallBackMethod error;
    boolean returnId;
    boolean multiple;
    CallBackMethod checkResult;
    SQLParamProvider sqlParamProvider;
    SQLResultProvider sqlResultProvider;
    String refeName;
    SQLTask(String sql, String type) {
        this.sql = sql;
        this.type = type;
    }
    SQLTask(String sql, String type, SQLParam[] param) {
        this.sql = sql;
        this.type = type;
        this.param = param;

    }
    SQLTask(String sql, String type, SQLParamProvider param) {
        this.sql = sql;
        this.type = type;
        this.sqlParamProvider = param;
    }
    SQLTask(String sql, String type, SQLParam[] param, SQLResult[] result) {
        this.sql = sql;
        this.type = type;
        this.param = param;
        this.result = result;
    }
    SQLTask(String sql, String type, SQLParamProvider param, SQLResultProvider result) {
        this.sql = sql;
        this.type = type;
        this.sqlParamProvider = param;
        this.sqlResultProvider = result;
    }
    SQLTask(String sql, String type, SQLParamProvider param, SQLResultProvider result, CallBackMethod checkResult) {
        this.sql = sql;
        this.type = type;
        this.sqlParamProvider = param;
        this.sqlResultProvider = result;
        this.checkResult = checkResult;
    }
    SQLTask(String sql, String type, SQLParamProvider param, SQLResultProvider result, boolean returnId, boolean multiple) {
        this.sql = sql;
        this.type = type;
        this.sqlParamProvider = param;
        this.sqlResultProvider = result;
        this.returnId = returnId;
        this.multiple = multiple;
    }
    SQLTask(String sql, String type, SQLParamProvider param, SQLResultProvider result, boolean returnId, boolean multiple, String refeName) {
        this.sql = sql;
        this.type = type;
        this.sqlParamProvider = param;
        this.sqlResultProvider = result;
        this.returnId = returnId;
        this.multiple = multiple;
        this.refeName = refeName;
    }


}


static void executeSql(Connection conn, List<SQLTask> sqlArg) throws Exception{
        conn.setAutoCommit(false);
        
        Iterator<SQLTask> iterator = sqlArg.iterator();
        while(iterator.hasNext()) {
            SQLTask arg = iterator.next();
            String sql = arg.sql;
            boolean returnId = arg.returnId;
            PreparedStatement prepareStatement = returnId?conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS):conn.prepareStatement(sql);
            
            if(arg.param==null && arg.sqlParamProvider!=null) {
                arg.param = arg.sqlParamProvider.get();
            }
            if(arg.param!=null) {
                for(int i=0;i<arg.param.length;i++) {
                    SQLParam sqlParam = arg.param[i];
                    int idx = sqlParam.idx;
                    String type = sqlParam.type;
                    String val = sqlParam.val;
                    if(type.equals("String") || type.equals("Text")) {
                        if(val==null) {
                            prepareStatement.setNull(idx, Types.VARCHAR);
                        } else {
                            prepareStatement.setString(idx, val);
                        }
                    } else if(type.equals("Id") || type.equals("Long")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.BIGINT);
                        } else {
                            prepareStatement.setLong(idx, Long.parseLong(val));
                        }
                    } else if(type.equals("Short")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.SMALLINT);
                        } else {
                            prepareStatement.setShort(idx, Short.parseShort(val));
                        }
                    } else if(type.equals("Integer")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.INTEGER);
                        } else {
                            prepareStatement.setInt(idx, Short.parseShort(val));
                        }
                    }  else if(type.equals("Double")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.DOUBLE);
                        } else {
                            prepareStatement.setDouble(idx, Double.parseDouble(val));
                        }
                    }  else if(type.equals("Float")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.FLOAT);
                        } else {
                            prepareStatement.setFloat(idx, Float.parseFloat(val));
                        }
                    }  else if(type.equals("Boolean")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.BOOLEAN);
                        } else {
                            prepareStatement.setBoolean(idx, Boolean.parseBoolean(val));
                        }
                    }  else if(type.equals("Decimal")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.DECIMAL);
                        } else {
                            prepareStatement.setBigDecimal(idx, new BigDecimal(val));
                        }
                    }  else if(type.equals("Date")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.DATE);
                        } else {
                            prepareStatement.setDate(idx, new java.sql.Date((new SimpleDateFormat("yyyy-MM-dd")).parse(val).getTime()));
                        }
                    }  else if(type.equals("DateTime")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.TIMESTAMP);
                        } else {
                            prepareStatement.setTimestamp(idx, new java.sql.Timestamp((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(val).getTime()));
                        }
                    }  else if(type.equals("Time")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.TIME);
                        } else {
                            prepareStatement.setTime(idx, new java.sql.Time((new SimpleDateFormat("HH:mm:ss")).parse(val).getTime()));
                        }
                    }  else if(type.equals("TimeStamp")) {
                        if(val==null || val.length()==0) {
                            prepareStatement.setNull(idx, Types.TIMESTAMP);
                        } else {
                            prepareStatement.setTimestamp(idx, new java.sql.Timestamp((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS z")).parse(val).getTime()));
                        }
                    } 

                }
                
            }
            ResultSet resultSet = null;
            try{
                if(returnId) {
                    prepareStatement.executeUpdate();
                    resultSet = prepareStatement.getGeneratedKeys();
                    conn.commit();
                } else if(arg.type.equals("QUERY")) {
                    resultSet = prepareStatement.executeQuery();
                } else {
                    prepareStatement.executeUpdate();
                    conn.commit();
                }
            } catch(Exception e) {
                conn.rollback();
                if(arg.error!=null)
                    arg.error.run(e);
                throw e;
            }
            
            if(arg.result==null && arg.sqlResultProvider!=null) {
                arg.result = arg.sqlResultProvider.get();
            }
            
            if(arg.result!=null && arg.result.length>0) {
                List<Map> list = null;
                if(arg.multiple) {
                    list = new ArrayList<Map>();
                }
                if(arg.checkResult!=null) {
                    if(resultSet.next()) {
                        for(int i=0;i<arg.result.length;i++) {
                            SQLResult sqlResult = arg.result[i];
                            int idx = sqlResult.idx;
                            String type = sqlResult.type;
                            String key = sqlResult.key;
                            Map[] maps = sqlResult.map;
                            Object value = null;
                            if(type.equals("Id")) {
                                Long id = resultSet.getLong(idx);
                                
                                    value = (String.valueOf(id));
                            } 
                            for(int j=0;j<maps.length;j++) {
                                
                                    maps[j].put(key, value);
                                
                            }                     
                        }

                    }

                } else {
                    while(resultSet.next()) {
                        Map<String, Object> itemMap = null;
                        if(arg.multiple) {
                           itemMap = new HashMap<String, Object>();
                        }
                        for(int i=0;i<arg.result.length;i++) {
                            SQLResult sqlResult = arg.result[i];
                            int idx = sqlResult.idx;
                            String type = sqlResult.type;
                            String key = sqlResult.key;
                            Map[] maps = sqlResult.map;
                            Object value = null;
                            if(type.equals("String") || type.equals("Text")) {
                              value = (resultSet.getObject(idx));
                            } else if(type.equals("Id")) {
                                Long id = resultSet.getLong(idx);
                                if(id!=0) {
                                    value = (String.valueOf(id));
                                }
                            }  else if(type.equals("Long")) {
                               value = (String.valueOf(resultSet.getLong(idx)));
                            } else if(type.equals("Short")) {
                              value = (String.valueOf(resultSet.getShort(idx)));
                            } else if(type.equals("Integer")) {
                              value = (String.valueOf(resultSet.getInt(idx)));
                            } else if(type.equals("Double")) {
                              value = (String.valueOf(resultSet.getDouble(idx)));
                            } else if(type.equals("Float")) {
                              value = (String.valueOf(resultSet.getFloat(idx)));
                            } else if(type.equals("Boolean")) {
                              value = (String.valueOf(resultSet.getBoolean(idx)));
                            } else if(type.equals("Decimal")) {
                              BigDecimal decimal = resultSet.getBigDecimal(idx);
                              if(decimal!=null) 
                                value = (decimal.toString());
                            } else if(type.equals("Date")) {
                              java.sql.Date date = resultSet.getDate(idx);
                              if(date!=null) 
                                value = ((new SimpleDateFormat("yyyy-MM-dd")).format(date));
                            } else if(type.equals("DateTime")) {
                              Timestamp date = resultSet.getTimestamp(idx);
                              if(date!=null) 
                                value = ((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(date));
                            } else if(type.equals("Time")) {
                              Time date = resultSet.getTime(idx);
                              if(date!=null) 
                                value = ((new SimpleDateFormat("HH:mm:ss")).format(date));
                            } else if(type.equals("TimeStamp")) {
                              Timestamp date = resultSet.getTimestamp(idx);
                              if(date !=null) 
                                value = ((new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS z")).format(date));
                            }

                            if(resultSet.wasNull()) {
                                value=null;
                            }
                            
                            if(value!=null) {
                                if(arg.multiple) {
                                    itemMap.put(key, value);
                                } else {
                                    for(int j=0;j<maps.length;j++) {
                                        maps[j].put(key, value);
                                    }
                                }                
                            }
                        }
                        if(arg.multiple) {
                            list.add(itemMap);
                        }
                    }
                }
                
                if(arg.multiple) {
                    for(int j=0;j<arg.result[0].map.length;j++) {
                        if(arg.refeName!=null) {
                            arg.result[0].map[j].put(arg.refeName, list);
                        } else {
                            arg.result[0].map[j].put("data", list);
                        }
                        
                    }
                }
            }
            if(arg.checkResult!=null) {
                arg.checkResult.run();
            }
            if(arg.succ!=null)
                arg.succ.run();
            
            
                
        }
        

        
    }

    public static void json2map(JSONObject obj, Map map, String prefixKey) {
        try {
            Iterator keys = obj.keys();
            while(keys.hasNext()) {
                String key = keys.next().toString();
                JSONObject val = obj.optJSONObject(key);
                JSONArray array = obj.optJSONArray(key);
                if(array!=null) {
                    List arrayList = new ArrayList();
                    int length = array.length();
                    for(int i=0;i<length;i++) {
                        JSONObject arrayObj = (JSONObject)array.get(i);
                        Map objMap = new HashMap();
                        json2map(arrayObj, objMap, null);
                        arrayList.add(objMap);
                    }
                    map.put(prefixKey!=null?prefixKey+key:key, arrayList);
                } else if(val!=null) {
                    json2map(obj.getJSONObject(key), map, prefixKey!=null?prefixKey+key+",":key+",");
                } else {
                    map.put(prefixKey!=null?prefixKey+key:key, obj.optString(key));
                }
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    public static void map2json(Map map, JSONObject obj) {
        try {
            Iterator<String> keySet = map.keySet().iterator();
            while(keySet.hasNext()) {
                String key = keySet.next();
                String[] keys = key.split(",");
                JSONObject newObj = obj;
                for(int i=0;i<keys.length-1;i++) {
                    JSONObject newObj2 = newObj.optJSONObject(keys[i]);
                    if(newObj2 == null) {
                        newObj2 = new JSONObject();
                        newObj.put(keys[i], newObj2);
                    }
                    newObj = newObj2;
                }
                Object valObj = map.get(key);
                
                if(valObj instanceof Map) {
                    map2json((Map) valObj, newObj);
                } else if(valObj instanceof List) {
                    List valLObjList = (List) valObj;
                    Iterator valLObjiterator = valLObjList.iterator();
                    JSONArray array = new JSONArray();
                    while(valLObjiterator.hasNext()) {
                        Map itemObj = (Map)valLObjiterator.next();
                        JSONObject newObj3 = new JSONObject();
                        map2json((Map) itemObj, newObj3);
                        array.put(newObj3);
                    }
                    newObj.put(key, array);
                } else {
                    newObj.put(keys[keys.length-1], valObj);
                }
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }




%>