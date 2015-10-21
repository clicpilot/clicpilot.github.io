<%!
class SessionHelper{
	private HttpSession session;
	SessionHelper(HttpSession session) {
		this.session = session;
	}
	public Object get(String key) {
		return this.session!=null?this.session.getAttribute(key):null;
	}
	
	public void put(String key, Object value) {
		this.session.setAttribute(key, value);
	}
	
	public void remove(String key) {
		this.session.removeAttribute(key);
	}
}



	@SuppressWarnings("unchecked")
	protected void map_val(Object res, String key, Object value) {
		((Map<String, Object>)res).put(key, value);
	}
	
	protected Object map_val(Object res, Object key) {
		if(res instanceof List ) {
			if(key.equals("length")) {
				return new BigDecimal(((List<Object>)res).size());
			} else {
				return ((List<Object>)res).get(((BigDecimal)key).intValue());
			}
		} else {
			return ((Map<String, Object>)res).get(key);
		}
	}

	protected Object to_number(String string) {
		BigDecimal dec = new BigDecimal(string);
		return dec;
	}
	
	protected Object to_date(Object string) {
		if(isNumber(string)) {
			return new java.util.Date(((BigDecimal)string).longValue());
		} else if(isString(string)){
			
			String ISO_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS zzz";
			SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);

			try {
				return sdf.parse((String)string);
			} catch (ParseException e) {
				ISO_FORMAT = "yyyy-MM-dd HH:mm:ss zzz";
				sdf = new SimpleDateFormat(ISO_FORMAT);				

				try {
					return sdf.parse((String)string);
				} catch (ParseException ex1) {
					ISO_FORMAT = "yyyy-MM-dd HH:mm:ss zzz";
					sdf = new SimpleDateFormat(ISO_FORMAT);					

					try {
						return sdf.parse((String)string);
					} catch (ParseException ex2) {
						ISO_FORMAT = "yyyy-MM-dd HH:mm:ss";
						sdf = new SimpleDateFormat(ISO_FORMAT);
						TimeZone utc = TimeZone.getTimeZone("UTC");
						sdf.setTimeZone(utc);
						try {
							return sdf.parse((String)string);
						} catch (ParseException ex3) {
							return null;
						}
					}
				}
			}
		}
		return null;

	}
	
	protected Object to_date() {
		return new java.util.Date();
	}
	
	protected Object to_date(Object year, Object month, Object day, Object hours, Object minutes, Object seconds, Object milliseconds) {
		String string = year+"-"+month+"-"+day+'T'+hours+":"+minutes+":"+seconds+":"+milliseconds+" "+"UTC";
		final String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS zzz";
		final SimpleDateFormat sdf = new SimpleDateFormat(ISO_FORMAT);
		final TimeZone utc = TimeZone.getTimeZone("UTC");
		sdf.setTimeZone(utc);
		try {
			return sdf.parse(string);
		} catch (ParseException e) {
			return null;
		}

	}
	
	protected Object to_boolean(boolean b) {
		return new Boolean(b);
	}
	
	
	protected Object object_calc(Object left, String operator, Object right) {
		
		if(operator.equals("+") || operator.equals("+=")){
			if(isNumber(left) && isNumber(right)) {
				return number_add(left, right);
			} else if(isString(left) || isString(right)) {
				String s = new String();
				if(left instanceof ArrayList) {
					s+=func_join(left);
				} else {
					s+=left==null?"undefined":left.toString();
				}
				
				if(right instanceof ArrayList) {
					s+=func_join(right);
				} else {
					s+=right==null?"undefined":right.toString();
				}
				
				return s;
			}
		} else if(operator.equals("-")){
			if(isNumber(left) && isNumber(right)) {
				return number_subtract(left, right);
			}
		} else if(operator.equals("*")){
			if(isNumber(left) && isNumber(right)) {
				return number_multiply(left, right);
			}
		} else if(operator.equals("/")){
			if(isNumber(left) && isNumber(right)) {
				return number_divide(left, right);
			}
		} else if(operator.equals("%")){
			if(isNumber(left) && isNumber(right)) {
				return number_remainder(left, right);
			}
		} else if(operator.equals("<")){
			if(isNumber(left) && isNumber(right)) {
				return number_lessthan(left, right);
			}
		} else if(operator.equals("==")){
			if(left == null || right==null) {
					return left == right;
			} else if(isNumber(left) && isNumber(right)) {
				return number_equal(left, right);
			}else {
				return left.toString().equals(right.toString());
			}
		} else if(operator.equals("-=")){
			if(isNumber(left) && isNumber(right)) {
				return number_subtract(left, right);
			}
		} else if(operator.equals("*=")){
			if(isNumber(left) && isNumber(right)) {
				return number_multiply(left, right);
			}
		} else if(operator.equals("/=")){
			if(isNumber(left) && isNumber(right)) {
				return number_divide(left, right);
			}
		} else if(operator.equals("%=")){
			if(isNumber(left) && isNumber(right)) {
				return number_remainder(left, right);
			}
		} else if(operator.equals("!=")){
			return (left!=right);
		}
		return null;
	}
	
	protected Object number_remainder(Object left, Object right) {
		return ((BigDecimal)left).remainder((BigDecimal)right);
	}

	protected Object number_equal(Object left, Object right) {
		return ((BigDecimal)left).compareTo((BigDecimal)right)==0;
	}

	protected Object number_lessthan(Object left, Object right) {
		return ((BigDecimal)left).compareTo((BigDecimal)right)==-1;
	}

	protected Object object_calc(Object left, String operator) {
		if(operator.equals("++")){
			if(isNumber(left)) {
				return number_add(left, new BigDecimal(1));
			}
		} else if(operator.equals("--")){
			if(isNumber(left)) {
				return number_subtract(left, new BigDecimal(1));
			}
		} else if(operator.equals("-")){
			if(isNumber(left)) {
				return number_subtract(new BigDecimal(0), left);
			}
		} else if(operator.equals("+")){
			if(isNumber(left)) {
				return left;
			}
		}
		return null;
	}
	
	protected boolean isBoolean(Object left) {
		return left!=null && left instanceof Boolean;
	}
	
	protected boolean isNumber(Object left) {
		return left!=null && left instanceof BigDecimal;
	}
	
	protected boolean isString(Object left) {
		return left!=null && left instanceof String;
	}
	
	protected boolean isArray(Object left) {
		return left!=null && left instanceof ArrayList;
	}
	
	
	protected BigDecimal number_add(Object left, Object right) {
		return ((BigDecimal)left).add((BigDecimal)right);
	}
	
	protected BigDecimal number_subtract(Object left, Object right) {
		return ((BigDecimal)left).subtract((BigDecimal)right);
	}
	
	protected BigDecimal number_divide(Object left, Object right) {
		return ((BigDecimal)left).divide((BigDecimal)right, MathContext.DECIMAL128);
	}
	
	protected BigDecimal number_multiply(Object left, Object right) {
		return ((BigDecimal)left).multiply((BigDecimal)right);
	}

	protected void log_debug(Object s) {
		System.out.println(s);
	}
	
	protected boolean cast_boolean(Object obj) {
		if(obj==null) {
			return false;
		} else if(isBoolean(obj)) {
			return (Boolean)obj;
		} else if(isNumber(obj)) {
			return ((BigDecimal)obj).doubleValue()!=0;
		} else if(isString(obj)) {
			return obj!=null && !((String)obj).equals("");
		} else if(isArray(obj)) {
			return obj!=null && ((ArrayList)obj).size()!=0;
		}
		return false;
	}
	
	protected int cast_int(Object obj) {
		if(obj instanceof String) {
			BigDecimal dec = new BigDecimal((String)obj);
			return dec.intValue();
		} else {
			return ((BigDecimal)obj).intValue();
		}

	}
	
	
	
	protected Map<String, Object> to_map(Object[][] array) {
		Map<String, Object> map = new HashMap<String, Object>();
		for(int i=0;i<array.length;i++) {
			map.put((String) array[i][0], array[i][1]);
		}
		return map;
	}
	
	
	


	protected Object func_valueOf(Object str) {
		// TODO Auto-generated method stub
		
		if(str instanceof String) {
			return ((String)str).toString();
		} else if(str instanceof List) {
			return func_join((List<Object>)str, ",");
		} else if(str instanceof java.util.Date) {
			return new BigDecimal(((java.util.Date)str).getTime());
		} else {
			return null;
		}
		
	}

	protected Object func_toUpperCase(Object str) {
		// TODO Auto-generated method stub
		return ((String)str).toUpperCase();
	}

	protected Object func_toString(Object str) {
		// TODO Auto-generated method stub
		
		if(str instanceof String) {
			return ((String)str).toString();
		} else if(str instanceof List) {
			return func_join((List<Object>)str, ",");
		} else if(str instanceof java.util.Date) {
			SimpleDateFormat s = new SimpleDateFormat("EEE MMM dd YYYY HH:mm:ss zzz");
			s.setTimeZone(TimeZone.getTimeZone("UTC"));
			return s.format((java.util.Date)str);
		} else {
			return null;
		}
	}

	protected Object func_toLowerCase(Object str) {
		// TODO Auto-generated method stub
		return ((String)str).toLowerCase();
	}

	protected Object func_toLocaleUpperCase(Object str) {
		// TODO Auto-generated method stub
		return ((String)str).toUpperCase(Locale.getDefault());
	}

	protected Object func_toLocaleLowerCase(Object str) {
		// TODO Auto-generated method stub
		return ((String)str).toLowerCase(Locale.getDefault());
	}

	protected Object func_substring(Object str, Object to_number,
			Object to_number2) {
		// TODO Auto-generated method stub
		return ((String)str).substring(((BigDecimal)to_number).intValue(), ((BigDecimal)to_number2).intValue());
	}

	protected Object func_substring(Object str, Object to_number) {
		// TODO Auto-generated method stub
		return ((String)str).substring(((BigDecimal)to_number).intValue());
	}

	protected Object func_substr(Object str, Object to_number, Object to_number2) {
		// TODO Auto-generated method stub
		int intValue = ((BigDecimal)to_number).intValue();
		return ((String)str).substring(intValue, intValue+((BigDecimal)to_number2).intValue());
	}

	protected Object func_substr(Object str, Object to_number) {
		// TODO Auto-generated method stub
		return ((String)str).substring(((BigDecimal)to_number).intValue());
	}

	protected Object func_split(Object str, String string2) {
		// TODO Auto-generated method stub
		return ((String)str).split(string2);
	}

	protected Object func_slice(Object str, Object to_number, Object object_calc) {
		// TODO Auto-generated method stub
		if(str instanceof String) {
			int intValue = ((BigDecimal)to_number).intValue();
			int intValue2 = ((BigDecimal)object_calc).intValue();
			intValue = intValue>0?intValue:(((String)str).length()+intValue);
			intValue2 = intValue2>0?intValue2:(((String)str).length()+intValue2);
			return ((String)str).substring(intValue, intValue2);
		} else if(str instanceof List) {
			int intValue = ((BigDecimal)to_number).intValue();
			int intValue2 = ((BigDecimal)object_calc).intValue();
			int c = intValue2-intValue;
			ArrayList l = new ArrayList(((List)str));
			Iterator i = l.iterator();
			int j=0;
			ArrayList list = new ArrayList();
			while(i.hasNext()) {
				Object o = (i.next());
				if(j>=intValue && j<intValue2) {
					list.add(o);
					i.remove();
				}
				j++;
			}
			return list;
		} else {
			return null;
		}
	}

	protected Object func_slice(Object str, Object to_number) {
		// TODO Auto-generated method stub
		
		
		if(str instanceof String) {
			return ((String)str).substring(((BigDecimal)to_number).intValue());
		} else if(str instanceof List) {
			int intValue = ((BigDecimal)to_number).intValue();
			ArrayList l = new ArrayList(((List)str));
			Iterator i = l.iterator();
			int j=0;
			ArrayList list = new ArrayList();
			while(i.hasNext()) {
				Object o = (i.next());
				if(j>=intValue) {
					list.add(o);
					i.remove();
				}
				j++;
			}
			return list;
		} else {
			return null;
		}
		
	}

	protected Object func_search(Object str, String string) {
		// TODO Auto-generated method stub
		return ((String)str).indexOf(string);
	}

	protected Object func_replace(Object str, String string, String string2) {
		// TODO Auto-generated method stub
		return ((String)str).replace(string, string2);
	}

	protected Object func_lastIndexOf(Object str, Object string, Object to_number) {
		// TODO Auto-generated method stub
		int intValue = ((BigDecimal)to_number).intValue();
		
		if(str instanceof String) {
			return ((String)str).lastIndexOf((String)string, intValue);
		} else if(str instanceof List) {
			return ((List<Object>)str).lastIndexOf(string);
			
		} else {
			return null;
		}
	}

	protected Object func_lastIndexOf(Object str, String string) {
		// TODO Auto-generated method stub
		
		if(str instanceof String) {
			return ((String)str).lastIndexOf(string);
		} else if(str instanceof List) {
			return ((List<Object>)str).lastIndexOf(string);
		} else {
			return null;
		}
	}

	protected Object func_indexOf(Object str, Object string, Object to_number) {
		// TODO Auto-generated method stub
		int intValue = ((BigDecimal)to_number).intValue();
		
		if(str instanceof String) {
			return ((String)str).indexOf((String)string, intValue);
		} else if(str instanceof List) {
			return ((List<Object>)str).lastIndexOf(string);
		} else {
			return null;
		}
	}

	protected Object func_indexOf(Object str, Object string) {
		if(str instanceof String) {
			return ((String)str).indexOf(string.toString());
		} else if(str instanceof List) {
			return ((List<Object>)str).indexOf(string);
		} else {
			return null;
		}
	}

	protected Object func_concat(Object str, String string) {
		// TODO Auto-generated method stub
		return ((String)str).concat(string);
	}

	protected Object func_charCodeAt(Object str, Object to_number) {
		// TODO Auto-generated method stub
		int intValue = ((BigDecimal)to_number).intValue();
		return (int)(((String)str).charAt(intValue));
	}

	protected Object func_charAt(Object str, Object to_number) {
		// TODO Auto-generated method stub
		int intValue = ((BigDecimal)to_number).intValue();
		return ((String)str).charAt(intValue);
	}
	


	protected Object func_unshift(Object a, Object... obj) {
		ArrayList list = new ArrayList();
		
		for(int i=0;i<obj.length;i++) {
			list.add(obj[i]);
			//Arrays.fill((List<Object>)a, 0, 0, obj[i]);
		}
		ArrayList<Object> a2 = (ArrayList<Object>)a;
		list.addAll(a2);
		a2.clear();
		a2.addAll(list);
		return list.size();
	}

	protected Object func_splice(Object a, Object to_number, Object to_number2,
			Object... obj) {
		
		int intValue = ((BigDecimal)to_number).intValue();
		int intValue2 = ((BigDecimal)to_number2).intValue();
		Iterator i = ((List)a).iterator();
		int j=0;
		ArrayList list = new ArrayList();
		while(i.hasNext()) {
			Object o = i.next();
			if(j>=intValue && j<intValue2) {
				i.remove();
				list.add(o);
			}
			j++;
		}
		((List)a).addAll(intValue, Arrays.asList(obj));
		return list;
	}

	protected Object func_splice(Object a, Object to_number, Object to_number2) {
		int intValue = ((BigDecimal)to_number).intValue();
		int intValue2 = ((BigDecimal)to_number2).intValue();
		Iterator i = ((List)a).iterator();
		int j=0;
		ArrayList list = new ArrayList();
		while(i.hasNext()) {
			Object o = i.next();
			if(j>=intValue && j<intValue2) {
				i.remove();
				list.add(o);
			}
			j++;
		}
		return list;
	}

	protected Object func_sort(Object a) {
		//ArrayList list = new ArrayList((ArrayList<Object>)a);
		Collections.sort((List)a);
		return a;
		
	}

	protected Object func_shift(Object a) {
		return ((List<Object>)a).remove(0);
	}

	protected Object func_reverse(Object a) {
		Collections.reverse((List<Object>)a);
		return func_join(a);
	}

	protected Object func_push(Object a, Object obj) {
		
		((List<Object>)a).add(obj);
		return ((List<Object>)a).size();
	}

	protected Object func_pop(Object a) {
		return ((List<Object>)a).remove(((List<Object>)a).size()-1);
	}

	protected Object func_join(Object a, String string) {
		StringBuffer sb = new StringBuffer();
		int size = ((List<Object>)a).size();
		for(int i=0;i<size;i++) {
			if(i>0) {
				sb.append(string);
			}
			sb.append(((List<Object>)a).get(i));
			
		}
		return sb.toString();
	}

	protected Object func_concat(Object a, Object... objects) {

		
		if(a instanceof String) {
			for(int i=0;i<objects.length;i++) {
				((String)a).concat((String)objects[i]);
			}
			return a;
		} else if(a instanceof List) {
			int len = 0;
			ArrayList list = new ArrayList((ArrayList<Object>)a);
			for(int i=0;i<objects.length;i++) {
				List l = (List<Object>)objects[i];
				int size = l.size();
				for(int j=0;j<size;j++) {
					//Collections.addAll(((List<Object>)a), l.get(j));
					list.add(l.get(j));
				}
			}
			return list;
		}
		return null;
		
	}

	protected Object func_join(Object a) {
		StringBuffer sb = new StringBuffer();
		int size = ((List<Object>)a).size();
		for(int i=0;i<size;i++) {
			if(i>0) {
				sb.append(",");
			}
			sb.append(((List<Object>)a).get(i));
			
		}
		return sb.toString();
	}
	
	
	protected Object math_tan(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.tan(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_sin(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.sin(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_cos(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.cos(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_atan2(Object y, Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.atan2(((BigDecimal)y).doubleValue(), ((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_atan(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.atan(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_asin(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.asin(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_acos(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.acos(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_pow(Object x, Object y) {
		
		return new BigDecimal(Math.pow(((BigDecimal)x).doubleValue(), ((BigDecimal)y).intValue()));
		
	}

	protected Object math_log(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.log(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_sqrt(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.sqrt(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_exp(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.exp(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_random() {
		
		return new BigDecimal(Math.random());
		
	}

	protected Object math_min(Object... x) {
		
//		double a = ((BigDecimal)x[0]).doubleValue();
//		for(int i=1;i<x.length;i++) {
//			a = Math.min(a, ((BigDecimal)x[i]).doubleValue());
//		}
//		return a;
		
		int j=0;
		double a = ((BigDecimal)x[j]).doubleValue();
		for(int i=1;i<x.length;i++) {
			//a = Math.max(a, ((BigDecimal)x[i]).doubleValue());
			if(a > ((BigDecimal)x[i]).doubleValue()){
				a = ((BigDecimal)x[i]).doubleValue();
				j=i;
			}
		}
		return x[j];
		
	}

	protected Object math_max(Object... x) {
		int j=0;
		double a = ((BigDecimal)x[j]).doubleValue();
		for(int i=1;i<x.length;i++) {
			//a = Math.max(a, ((BigDecimal)x[i]).doubleValue());
			if(a < ((BigDecimal)x[i]).doubleValue()){
				a = ((BigDecimal)x[i]).doubleValue();
				j=i;
			}
		}
		return x[j];
		
	}

	protected Object math_floor(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.floor(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_ceil(Object x) {
		if(isNumber(x)) {
		return new BigDecimal(Math.ceil(((BigDecimal)x).doubleValue()));
		} else {
			return null;
		}
	}

	protected Object math_abs(Object x) {
		if(isNumber(x)) {
			return new BigDecimal(String.valueOf((new BigDecimal(Math.abs(((BigDecimal)x).doubleValue()))).doubleValue()));
		} else {
			return null;
		}
	}
	
	protected Object math_round(Object s) {
		if(isNumber(s)) {
			return new BigDecimal(Math.round(((BigDecimal)s).doubleValue()));
		} else if(isString(s) && isNumber(to_number((String)s))){
			return new BigDecimal(Math.round(((BigDecimal)to_number((String)s)).doubleValue()));
		} else {
			return null;
		}
	}
	
	protected Object func_toFixed(Object s, Object n) {
		if(isNumber(s) && isNumber(n)) {
			int num = ((BigDecimal)n).intValue();
			return ((BigDecimal)s).setScale(num, BigDecimal.ROUND_HALF_UP);			
		} else {
			return null;
		}
	}
	
	protected Object func_getYear(Object d) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.YEAR));

	}

	protected Object func_getUTCSeconds(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.SECOND));
	}

	protected Object func_getUTCMonth(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.MONTH));
	}

	protected Object func_getUTCMinutes(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.MINUTE));
	}

	protected Object func_getUTCMilliseconds(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.MILLISECOND));
	}

	protected Object func_getUTCHours(Object d) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.HOUR_OF_DAY));
	}

	protected Object func_getUTCFullYear(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.YEAR));
	}

	protected Object func_getUTCDay(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.DAY_OF_WEEK)-1);
	}

	protected Object func_getUTCDate(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.setTimeZone(TimeZone.getTimeZone("UTC"));
		return new BigDecimal(calendar.get(Calendar.DATE));
	}

	protected Object func_getTimezoneOffset(Object d) {
		return new BigDecimal("-"+TimeZone.getDefault().getOffset(((java.util.Date)d).getTime())/60/1000);
//		Calendar calendar = Calendar.getInstance();
//		calendar.setTime((java.util.Date)d);
//		System.out.println(calendar.get(Calendar.DST_OFFSET))
//		return new BigDecimal(calendar.get(Calendar.DST_OFFSET)/60/1000);
	}

	protected Object func_getTime(Object d) {
		return new BigDecimal(((java.util.Date)d).getTime());
	}

	protected Object func_getSeconds(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.SECOND));
	}

	protected Object func_getMonth(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.MONTH));
	}

	protected Object func_getMinutes(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.MINUTE));
	}

	protected Object func_getMilliseconds(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.MILLISECOND));
	}

	protected Object func_getHours(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.HOUR_OF_DAY));
	}

	protected Object func_getFullYear(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.YEAR));
	}

	protected Object func_getDay(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.DAY_OF_WEEK)-1);
	}

	protected Object func_getDate(Object d) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		return new BigDecimal(calendar.get(Calendar.DATE));
	}
	
	protected void func_setUTCSeconds(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.SECOND, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCMonth(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.MONTH, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCMinutes(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.MINUTE, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCMilliseconds(Object d, Object func_getTime) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.SECOND, ((BigDecimal)func_getTime).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCHours(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.HOUR_OF_DAY, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCFullYear(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.YEAR, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setUTCDate(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.DAY_OF_MONTH, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setTime(Object d, Object func_getTime) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new java.util.Date(((BigDecimal)func_getTime).longValue()));
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setSeconds(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.SECOND, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setMonth(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.MONTH, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setMinutes(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.MINUTE, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setMilliseconds(Object d, Object func_getTime) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.MILLISECOND, ((BigDecimal)func_getTime).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setHours(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.HOUR_OF_DAY, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setFullYear(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.YEAR, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
	}

	protected void func_setDate(Object d, Object to_number) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime((java.util.Date)d);
		calendar.set(Calendar.DAY_OF_MONTH, ((BigDecimal)to_number).intValue());
		((java.util.Date)d).setTime(calendar.getTimeInMillis());
		
	}

	protected String func_toDateString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("EEE MMM dd YYYY");
		return s.format((java.util.Date)d);
		
	}
	
	protected String func_toISOString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.sss'Z'");
		s.setTimeZone(TimeZone.getTimeZone("UTC"));
		return s.format((java.util.Date)d);
		
	}
	
	
	protected String func_toJSON(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("YYYY-MM-dd'T'HH:mm:ss.sss'Z'");
		s.setTimeZone(TimeZone.getTimeZone("UTC"));
		return s.format((java.util.Date)d);
		
	}
	
	
	protected String func_toLocaleDateString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("M/d/YYYY");
		s.setTimeZone(TimeZone.getDefault());
		return s.format((java.util.Date)d);
		
	}
	
	protected String func_toLocaleTimeString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("h:mm:ss a");
		s.setTimeZone(TimeZone.getDefault());
		return s.format((java.util.Date)d);
		
	}
	
	protected String func_toLocaleString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("M/d/YYYY, h:mm:ss a");
		s.setTimeZone(TimeZone.getDefault());
		return s.format((java.util.Date)d);
		
	}
	
	protected String func_toTimeString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("HH:mm:ss zzz");
		s.setTimeZone(TimeZone.getTimeZone("UTC"));
		return s.format((java.util.Date)d);
		
	}
	
	protected String func_toUTCString(Object d) {
		SimpleDateFormat s = new SimpleDateFormat("EEE, dd MMM YYYY HH:mm:ss 'GMT'");
		s.setTimeZone(TimeZone.getTimeZone("UTC"));
		return s.format((java.util.Date)d);
		
	}
	
	protected BigDecimal func_toUTC(Object d) {
		
		return new BigDecimal(((java.util.Date)d).getTime());
		
	}

	protected void func_put(Object obj, Object name, Object val) {
		if(obj instanceof SessionHelper) {
			((SessionHelper)obj).put((String)name, val);
			System.out.println("put "+name+": "+((SessionHelper)obj).get((String)name));
		}
		else
			 map_val(obj, (String)name, val);
	}

	protected Object func_get(Object obj, Object name) {
		if(obj instanceof SessionHelper) {
			System.out.println("get "+name+": "+((SessionHelper)obj).get((String)name));
			return ((SessionHelper)obj).get((String)name);
		}
		else
			return map_val(obj, (String)name);
	}

	protected void func_remove(Object obj, Object name) {
		if(obj instanceof SessionHelper)
			((SessionHelper)obj).remove((String)name);

			
	}
	
	
	protected void alert(Object obj) {
		 System.out.println(obj);
	}
	



%>